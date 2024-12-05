import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('database connection is stablished successfully!');
    } catch (error) {
        console.log('Error to connecting database connection')
    }
}

export default connectDB;