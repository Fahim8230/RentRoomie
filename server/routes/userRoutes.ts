// routes/userRoutes.ts
import express from 'express';
import {
    createUser,
    loginUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
} from '../controllers/userController';

const router = express.Router();

// CRUD Routes for User
router.post('/', createUser); // Create user
router.post('/login', loginUser);
router.get('/', getUsers); // Get all users
router.get('/:id', getUserById); // Get a single user by ID
router.put('/:id', updateUser); // Update a user by ID
router.delete('/:id', deleteUser); // Delete a user by ID

export default router;
