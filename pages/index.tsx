//@ts-nocheck

import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import CalenderView from '../components/CalendarView';

interface Entry {
    _id: string;
    time: number;
    date: any;
    weekday: number;
    description: string;
    user: string;
    study: boolean;
    code: boolean;
    work: boolean;
    uni: boolean;
}


export default function Home() {

    const { data: session, status } = useSession();
    const [activityList, setActivityList] = useState<Entry[]>();
    const [sendRequest, setSendRequest] = useState(false);

    useEffect(() => {
        async function fetchList() {
            const response = await fetch('/api/getentrylist', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data.list)
            if (!response.ok) { 
                console.log(data.message || 'Something went wrong!');
            } else {
                setActivityList(data.list);
            }
        }
        if (session && !sendRequest){
            setSendRequest(true);
            fetchList();
        }
    })

    return (
        <>
            <Head>
                <title>My-CS-Tracker</title>
                <meta name="description" content="Dashboard for my-cs-tracker" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <main className='md:p-4 pt-2 lg:p-8 h-full w-full'>
                    <p className='px-4 text-xl text-gray-800 font-bold'>Hey there {session?.user.username}!</p>
                    <p className='p-4 italic'>&quot;No man has the right to be an amateur in the matter of physical training. It is a shame for a man to grow old without seeing the beauty and strength of which his body is capable&quot; - Aristotle</p>
                    <div className="min-w-full sm:p-2 shadow rounded-lg bg-white">
                    {session && <CalenderView activityList={activityList} />}
                    </div>                
                </main>
            </Layout>
        </>
    )
}
