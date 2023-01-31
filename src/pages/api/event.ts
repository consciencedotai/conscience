import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/db/db_init';
import { CalendarEvent } from '@/db/schema';

type EntryResponse = {
    message?: string;
    errors?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<EntryResponse>
) {
    if (req.method === 'POST') {
        const client = await connectDB();
        const db = client.db("Conscience");

        const newEvent: CalendarEvent = req.body;

        const post = await db.collection("Conscience").insertOne(newEvent);

        if (post.acknowledged) {
            res.status(200).json({ message: 'object added' });
        }
        else {
            res.status(400).json({ errors: 'object not acknowledged by database' });
        }
    }
    else {
        res.status(404).json({ message: 'page not found' });
    }
}
