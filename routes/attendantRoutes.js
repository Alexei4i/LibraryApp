
import express from 'express';
import { createAttendants, getAttendant, getAttendantById, deleteAttendant, updateAttendant } from '../Controllers/attendantControl.js';


const router = express.Router();

// Get all attendants
router.get('/', getAttendant);

// Add new attendant
router.post('/', createAttendants);

// Get attendant by ID
router.get('/:id', getAttendantById);

// Delete attendant by ID
router.delete('/:id', deleteAttendant);

// Update attendant by ID
router.patch('/:id', updateAttendant);

export default router;