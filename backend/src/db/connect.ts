import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB connected: !! DB HOST: ${connectionInstance.connection.host} !! DB NAME: ${connectionInstance.connection.name}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;