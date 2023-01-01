//@ts-nocheck


import { connectToMongo } from "../../helperFunctions/mongodb";
import User from "../../models/UserModel";
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import Activity from "../../models/ActivityModel";

interface SignupRequest extends NextApiRequest {
    body: {
        time: number;
        description: string;
        study: boolean;
        code: boolean;
        work: boolean;
        uni: boolean;
    };
}

class extendedDate extends Date {
    getWeekNumber(){
        let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
        let dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        return Math.ceil((((+d - +yearStart) / 86400000) + 1)/7);
    }

}

async function handler(req: SignupRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return;
    }
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        console.log("No session, not logged in");
        res.status(401).json({message: "You must be logged in"})
    } else {
        const data = req.body;
        const { time, description, study, code, work, uni } = data;

        if (!time) {
            res.status(422).json({ message: 'Missing parameters'});
            return;
        }

        await connectToMongo();

        const today = new extendedDate();
        const _id = session.user._id;
        let user = await User.findOne({ _id });
        let alreadyExists = await Activity.findOne({ date: today.toJSON().slice(0, 10)});

        if (!user) {
            console.log("User not found");
            res.status(422).json({ message: 'User not found'});
            return;
        } else if (alreadyExists) {
            res.status(400).json({ message: 'Entry already exists'});
            return;
        } else {
            let activity = new Activity({
                user: _id,
                date: today.toJSON().slice(0, 10),
                weekday: today.getWeekNumber(),
                study: study,
                code: code, 
                work: work,
                uni: uni,
                time: time,
                description: description
            });
            console.log(activity);
            
            await activity.save(async function (err:any) {
                if (err) {
                    console.log(err)
                    res.status(500).json({message: "Something went wrong"}) 
                    return;
                } else {
                    res.status(200).json({message: "Entry added"}) 
                    return;
                }
            });
        }
    }
}

export default handler;




