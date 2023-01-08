//@ts-nocheck

import { connectToMongo } from "../../../helperFunctions/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import Activity from "../../../models/ActivityModel";

interface SignupRequest extends NextApiRequest {
    body: {
        date: any;
        weekday: number;
        time: number;
        description: string;
        study: boolean;
        code: boolean;
        work: boolean;
        uni: boolean;
        id: string;
    };
}

async function handler(req: SignupRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return;
    }
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        console.log("No session, not logged in");
        res.status(401).json({message: "You must be logged in"})
    } else {
        const data = req.body;
        const { date, weekday, time, description, study, code, work, uni, id } = data;

        if (!time) {
            res.status(422).json({ message: 'Missing parameters'});
            return;
        }

        await connectToMongo();

        const _id = session.user!._id!;
        let entry = await Activity.findOne({ _id: id, user:_id });

        if (!entry) {
            console.log("Entry not found");
            res.status(422).json({ message: 'Entry not found'});
            return;
        } else { 
            entry.overwrite({
                user: _id,
                date: date,
                weekday: weekday,
                time: time,
                description: description,
                study: study,
                code: code,
                work: work,
                uni: uni,
            });
  
            await entry.save(function(err:any) {
                if (err) {
                    console.log(err)
                    res.status(500).json({message: "There was an error saving"});
                    return;
                } else {
                    res.status(201).json({ message: `Success`});
                    return;
                }
            })
        }
    }
}

export default handler;




