import express from 'express';
import { createStudents, getStudent, getStudentById, deleteStudent, updateStudent } from '../Controllers/studentControl.js';

const router = express.Router();

// Get all students
router.get('/', getStudent);

// Add new student
router.post('/', createStudents);

// Get student by ID
router.get('/:id', getStudentById);

// Delete student by ID
router.delete('/:id', deleteStudent);

// Update student by ID
router.patch('/:id', updateStudent);

export default router;