import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose"

// conexcion mongo
export const dbConect = async () => {
    const DB_URI = process.env.MONGODB_URI
    try {
        await mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(res => console.log('dataDase successful'))
        .catch(err => console.log(err))
    } catch (error) {
        console.log(error);
    }
}