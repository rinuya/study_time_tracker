//@ts-nocheck

import Head from 'next/head'
import Layout from "../components/Layout";
import ActivityForm from "../components/ActivityForm";

export default function AddEntry() {

    return (
        <>
            <Head>
                <title>Add Entry</title>
                <meta name="description" content="Add an entry to cs_tracker" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                
                <ActivityForm />
                
            </Layout>
        </>
       

    )
}
