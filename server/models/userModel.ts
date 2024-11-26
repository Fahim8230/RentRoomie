// models/userModel.ts
import mongoose, { Document } from 'mongoose';

// Existing Interfaces
export interface IBudget {
    low: number;
    high: number;
}

export interface IAdditionalInfo {
    budget: IBudget;
    // You can add more fields here as needed
}

// New Interfaces for Preferences
export interface IAgePreference {
    minAge: number;
    maxAge: number;
}

export interface IBudgetPreference {
    low: number;
    high: number;
}

export interface IPreference {
    agePreference?: IAgePreference;
    genderPreference?: string[];
    budgetPreference?: IBudgetPreference;
}

// Updated IUser Interface to include preference
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    gender: string;
    additionalInfo?: IAdditionalInfo; // Optional
    preference?: IPreference; // New preference field
}

// Existing Schemas
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

// New Schemas for Preferences
const agePreferenceSchema = new mongoose.Schema(
    {
        minAge: {
            type: Number,
            required: true,
            min: 18,
        },
        maxAge: {
            type: Number,
            required: true,
            min: 18,
        },
    },
    { _id: false }
);

const budgetPreferenceSchema = new mongoose.Schema(
    {
        low: {
            type: Number,
            required: true,
            min: 0,
        },
        high: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { _id: false }
);

const preferenceSchema = new mongoose.Schema(
    {
        agePreference: {
            type: agePreferenceSchema,
            required: false,
        },
        genderPreference: {
            type: [String], // Array of acceptable genders
            required: false,
        },
        budgetPreference: {
            type: budgetPreferenceSchema,
            required: false,
        },
    },
    { _id: false }
);

// Updated User Schema to include preference
const userSchema = new mongoose.Schema(
    {
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
            required: false // Optional
        },
        preference: {
            type: preferenceSchema,
            required: false, // Optional
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;