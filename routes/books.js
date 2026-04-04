// Import express
import express from 'express';
// Import controller functions for user operations
import { createUsers, getUser, getUserbyId, deleteUser, updateUser } from '../Controllers/users.js';

// Create router
const router = express.Router();

// Get all users
router.get('/', getUser);

// Add new user
router.post('/', createUsers);

// Get user by ID
router.get('/:id', getUserbyId);

// Delete user by ID
router.delete('/:id', deleteUser);

// Update user by ID
router.patch('/:id', updateUser);

// Export the router to be used in the main server file (index.js)
export default router; // we export the router object so that it can be imported and used in other parts of the application, such as in the main server file (index.js) where we define the routes for the application. This allows us to keep our route definitions organized and modular.