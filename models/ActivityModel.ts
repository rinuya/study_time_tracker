import { Schema, model, models } from 'mongoose';

const ActivitySchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    date: {type: Date, required: true},
    weekday: {type: Number, required: true},
    study: {type: Boolean, required: true},
    code: {type: Boolean, required: true},
    work: {type: Boolean, required: true},
    uni: {type: Boolean, required: true},
    // time in hours
    time: {type: Number, required: true},
    description: {type: String},
});

const Activity = models.Activity || model('Activity', ActivitySchema)

export default Activity