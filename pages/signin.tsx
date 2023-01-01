//@ts-nocheck

import Head from 'next/head'
import { useState, useRef } from "react"
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Link from "next/link";

export default function Signin() {

    const router = useRouter();

    let [loginFailed, setLoginFailed] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();

    async function hanldeSubmit(event) {
        if (usernameRef.current.value && passwordRef.current.value) {
            const result = await signIn('credentials', {
                redirect: false,
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            });
            if (!result?.error) {
                router.replace('/');
            }
            if (result?.error) {
                setLoginFailed(true);        
            }
        }
    }

    return (
        <>
            <Head>
                <title>Signin</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex justify-centerpt-20">
                    {loginFailed ? <p className='text-red-600'>Wrong username or password</p> : ""}
                    <label htmlFor='username'>Username</label>
                    <input ref={usernameRef} name="username" type="text" className="bg-gray-200" />
                    <label htmlFor='password'>Password</label>
                    <input ref={passwordRef} name="password" type="password" className="bg-gray-200" />
                    <button type="submit" onClick={hanldeSubmit}>Submit</button>
            </main>
        </>
    )
}