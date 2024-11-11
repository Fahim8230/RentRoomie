// controllers/userController.ts
import {Request, Response} from 'express';
import User from '../models/userModel';
import bcrypt from "bcryptjs";
// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {firstName, lastName, email, password, dateOfBirth, gender} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dateOfBirth: new Date(dateOfBirth),
            gender
        });
        await user.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({error: 'Registration failed'});
    }
};

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};
