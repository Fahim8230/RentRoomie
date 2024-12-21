// config/database.ts
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connection = process.env.MONG_URL;

export async function connectDB(): Promise<void> {
    try {
        await mongoose.connect(connection!); // Using non-null assertion since MONG_URL should be defined
        console.log('MongoDB connection successful');
    } catch (err: any) {
        console.error('MongoDB connection failed:', err.message);
        // Exit process with failure
        process.exit(1);
    }
};