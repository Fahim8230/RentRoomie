// controllers/userController.ts
import {Request, Response} from 'express';
import User from '../models/userModel';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// // Create a new user
// export const createUser = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const {firstName, lastName, email, password, dateOfBirth, gender} = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword,
//             dateOfBirth: new Date(dateOfBirth),
//             gender
//         });
//         await user.save();
//         res.status(201).json({message: 'User registered successfully'});
//     } catch (error) {
//         res.status(500).json({error: 'Registration failed'});
//     }
// };

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, password, dateOfBirth, gender } = req.body;

        // Check if all required fields are present
        if (!firstName || !lastName || !email || !password || !dateOfBirth || !gender) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        // Check if email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }

        // Check if email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ error: 'Email is already in use' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dateOfBirth: new Date(dateOfBirth),
            gender
        });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        // Create JWT payload
        const payload = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
        };

        // Generate JWT token with a 24-hour expiration
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Send token in response
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
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
