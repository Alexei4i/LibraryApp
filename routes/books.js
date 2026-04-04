// Import express
import express from 'express';
// Import controller functions for book operations
import { createBooks, getBook, getBookById, deleteBook, updateBook } from '../Controllers/books.js';

// Create router
const router = express.Router();

// Get all books
router.get('/', getBook);

// Add new book
router.post('/', createBooks);

// Get book by ID
router.get('/:id', getBookById);

// Delete book by ID
router.delete('/:id', deleteBook);

// Update book by ID
router.patch('/:id', updateBook);

// Export the router to be used in the main server file (index.js)
export default router; // we export the router object so that it can be imported and used in other parts of the application, such as in the main server file (index.js) where we define the routes for the application. This allows us to keep our route definitions organized and modular.