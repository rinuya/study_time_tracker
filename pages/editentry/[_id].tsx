import Head from 'next/head'
import Layout from "../../components/Layout";
import EditForm from "../../components/EditForm";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';

export default function AddEntry() {

    const router = useRouter();
    const { data: session, status } = useSession();
    const { _id } = router.query
    const [entry, setEntry] = useState(null);

    useEffect(() => {
        async function fetchList() {
            const response = await fetch(`/api/getentry/${_id}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data.entry)
            if (!response.ok) { 
                console.log(data.message || 'Something went wrong!');
            } else {
                setEntry(data.entry);
            }
            
        }
        if (session && router.isReady){
            fetchList();
        }
    }, [_id, router, session])

    return (
        <>
            <Head>
                <title>Edit Entry</title>
                <meta name="description" content="Add an entry to cs_tracker" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                {entry && <EditForm entry={entry} />}
            </Layout>
        </>
       

    )
}
