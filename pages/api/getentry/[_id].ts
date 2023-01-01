//@ts-nocheck

import { connectToMongo } from "../../../helperFunctions/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import Activity from "../../../models/ActivityModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return;
    }
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        console.log("No session, not logged in");
        res.status(401).json({message: "You must be logged in"})
    } else {
        const { _id } = req.query
        await connectToMongo();
        const user_id = session.user._id;
        let entry = await Activity.findOne({ _id: _id, user:user_id });
        
        if (!entry) {
            console.log("Entry not found");
            res.status(422).json({ message: 'Entry not found'});
            return;
        } else { 
            res.status(200).json({ message: 'Success', entry: entry});
            return;
        }
    }
}

export default handler;




