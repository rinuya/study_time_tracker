//@ts-nocheck

import { connectToMongo } from "../../helperFunctions/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import Activity from "../../models/ActivityModel";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return;
    }
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        console.log("No session, not logged in");
        res.status(401).json({message: "You must be logged in"})
    } else {

        await connectToMongo();
        const _id = session.user._id;
        let activities = await Activity.find({ user:_id });
        
        if (!activities[0]) {
            console.log("activities not found");
            res.status(422).json({ message: 'User not found'});
            return;
        } else { 
            res.status(200).json({ message: 'Success', list: activities});
            return;
        }
    }
}

export default handler;




