// models/userModel.ts
import mongoose, { Document } from 'mongoose';

export interface IBudget {
    low: number;
    high: number;
}

export interface IAdditionalInfo {
    budget: IBudget;
    // You can add more fields here as needed
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    gender: string;
    additionalInfo?: IAdditionalInfo; // Make it optional if not required during registration
}

const budgetSchema = new mongoose.Schema({
    low: {
        type: Number,
        required: true,
        min: 0
    },
    high: {
        type: Number,
        required: true,
        min: 0
    }
}, { _id: false });

const additionalInfoSchema = new mongoose.Schema({
    budget: {
        type: budgetSchema,
        required: true
    }
    // Add more nested fields here if needed
}, { _id: false });

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    additionalInfo: {
        type: additionalInfoSchema,
        required: false // Set to true if you want to make it mandatory
    },
}, {
    timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
