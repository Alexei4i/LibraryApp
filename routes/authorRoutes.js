import express from 'express';
import { createAuthors, getAuthor, getAuthorById, deleteAuthor, updateAuthor } from '../Controllers/authorControl.js';

const router = express.Router();

// Get all authors
router.get('/', getAuthor);

// Add new author
router.post('/', createAuthors);

// Get author by ID
router.get('/:id', getAuthorById);

// Delete author by ID
router.delete('/:id', deleteAuthor);

// Update author by ID
router.patch('/:id', updateAuthor);

export default router;