// routes/userRoutes.ts

import express from 'express';
import {
    createUser,
    deleteUser,
    getPreferences,
    getUserById,
    getUsers,
    loginUser,
    getUserProfile,
    updatePreferences,
    updateUser,
} from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// CRUD Routes for User
router.post('/', createUser); // Create user
router.post('/login', loginUser);
router.get('/', authMiddleware, getUsers); // Get all users

// New Routes for Preferences - Place these before dynamic routes
router.put('/preferences', authMiddleware, updatePreferences); // Update preferences
router.get('/preferences', authMiddleware, getPreferences);   // Get preferences

// Dynamic Routes for User by ID - Place these after specific routes
router.get('/:id', authMiddleware, getUserById); // Get a single user by ID
router.put('/:id', authMiddleware, updateUser); // Update a user by ID
router.delete('/:id', authMiddleware, deleteUser); // Delete a user by ID
router.get('/getUserProfile/:userId', authMiddleware, getUserProfile);

export default router;
