import mongoose from 'mongoose';

export const connectToMongo = async () => {
    if (process.env.MONGO_URI) {
        mongoose.connect(process.env.MONGO_URI);
    } else {
        console.log("no process.env variable for mongoDB connection")
    }
}

export const disconnectFromMongo = async() => mongoose.connection.close();