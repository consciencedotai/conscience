import Head from 'next/head';
import Calendar from './components/calendar';
import { connectDB } from '../db/dbInit';

export default function Home() {
    return (
        <>
            <Head>
                <title>Conscience</title>
                <meta name="description" content="ULTRA MEGA DISCIPLINE SIGMA BOOSTER" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Calendar />
        </>
    )
}

export async function getServerSideProps() {
    const db = await connectDB()
    const testCollection = db?.collection("Conscience")

    testCollection.insert({
        "name": "John"
    })

    return {
        props: {
        }
    }
}

