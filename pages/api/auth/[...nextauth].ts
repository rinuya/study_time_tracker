//@ts-nocheck

import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from "../../../models/UserModel";
import { verifyPassword } from '../../../helperFunctions/auth';
import { connectToMongo } from "../../../helperFunctions/mongodb";


export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        
        await connectToMongo();

        const user = await User.findOne({
          username: credentials.username,
        });

        if (!user) {
            console.log("user does not exist")
            throw new Error('Could not log you in!');
        }

        const isValid = await verifyPassword(credentials.password, user.password);

        if (!isValid) {

            console.log("Login denied")
            throw new Error('Could not log you in!');
        }
        console.log("Loggin you in")
        return {
          "email": user.email,
          "_id": user._id,
          "username": user.username,
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  }
}

export default NextAuth(authOptions);