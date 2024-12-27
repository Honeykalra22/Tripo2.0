import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'

const connectDB = async () => {
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`mongo DB is connected successfully: ${response.connection.host}`);
    } catch (error) {
        console.log('mongo DB is not connected!!!!!!!!!', error);
    }
}

export default connectDB