import express from 'express';
import { createBooks, getBook, getBookById, deleteBook, updateBook, borrowBook, returnBook} from '../Controllers/bookControl.js';

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

// POST /books/:id/borrow 
router.post('/borrow/:id', borrowBook);

//POST /books/:id/return
router.post('/return/:id', returnBook);


export default router; 