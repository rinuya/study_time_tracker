import { hashPassword } from '../../../helperFunctions/auth';
import { connectToMongo } from "../../../helperFunctions/mongodb";
import User from "../../../models/UserModel";
import type { NextApiRequest, NextApiResponse } from 'next';

interface SignupRequest extends NextApiRequest {
    body: {
        email: string;
        username: string;
        password: string;
        secret: string;
    };
}

async function handler(req: SignupRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return;
    }

    const data = req.body;
    const { email, password, username, secret } = data;

    if (!email || !email.includes('@') || !password || password.trim().length < 7) {
        res.status(422).json({ message: 'Invalid input - password should also be at least 7 characters long.'});
        return;
    }
    if (secret != process.env.SIGNUP_SECRET) {
            res.status(400).json({ message:'You dont know the secret do you?'});
            return;
    }
    await connectToMongo();
    let existingEmail = await User.findOne({ email: email });
    let existingUser = await User.findOne({ username: username });

    if (existingUser || existingEmail) {
        res.status(422).json({ message: 'User exists already!', style: "" });
        return;
    }

    const hashedPassword = await hashPassword(password);
    const createdUser = new User({
        email: email,
        username: username,
        password: hashedPassword,
    });
    
    await createdUser.save(function(err:any, result:any){
        if (err) {
            res.status(500).json({message: "Something went wrong trying to save your profile"}); 
            return;
        } else {
            console.log("Account created!");
            res.status(200).json({ message: "Account created!"});
            return;
        }
    });
}

export default handler;




