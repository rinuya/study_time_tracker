import Head from 'next/head'
import { useState, useRef } from "react"
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Layout from '../components/Layout';


export default function Signin() {

    const router = useRouter();

    let [loginFailed, setLoginFailed] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function hanldeSubmit() {
        const username = usernameRef.current ? usernameRef.current.value : "";
        const password = passwordRef.current ? passwordRef.current.value : "";
        if (username && password) {
            const result = await signIn('credentials', {
                redirect: false,
                username: username,
                password: password,
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
            <Layout>
                <main className="flex justify-center pt-16">
                        <div className="flex flex-col bg-white p-4 md:p-6 lg:p-12">
                            <h1 className="sm:text-4xl text-3xl font-medium pb-4">SignIn</h1>
                            <p className='max-w-[45ch] text-gray-700 text-sm pb-6'>Please not that this is not a &apos;public&apos; website, you will need to know the secret in order to signup</p>
                            {loginFailed ? <p className='text-red-600'>Wrong username or password</p> : ""}
                            <div className="relative z-0 mb-6">
                                <input ref={usernameRef} type="text" name="username" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                                <label htmlFor='username' className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Username</label>
                            </div>
                            <div className="relative z-0 mb-6">
                                <input ref={passwordRef} type="password" name="password" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                                <label htmlFor='password' className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Password</label>
                            </div>
                            <button type="submit" className="mt-5 rounded-md bg-black hover:bg-gray-800 focus:bg-gray-800 px-10 py-2 text-white leading-tight shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" onClick={hanldeSubmit}>Submit</button>
                        </div>
                </main>
            </Layout>
        </>
    )
}
