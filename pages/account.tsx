import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home() {

    return (
        <>
            <Head>
                <title>My-CS-Tracker</title>
                <meta name="description" content="Dashboard for my-cs-tracker" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <main className='p-2 sm:p-8 h-full w-full'>
                    Coming soon..         
                </main>
            </Layout>

    
        </>
       

    )
}
