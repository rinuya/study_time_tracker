import Head from 'next/head'
import Layout from "../components/Layout";
import ListviewTable from "../components/ListviewTable";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";

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


export default function Listview() {

    const { data: session, status } = useSession();
    const [activityList, setActivityList] = useState<Entry[]>();
    const [sendRequest, setSendRequest] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    });

    return (
        <>
            <Head>
                <title>Add Entry</title>
                <meta name="description" content="Add an entry to cs_tracker" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <main className='p-2 sm:p-8 h-full w-full'>
                    <div className="w-full sm:p-2 shadow rounded-lg bg-white">
                        <ListviewTable activityList={activityList} />
                    </div>
                </main>
            </Layout>
        </>
    )
}
