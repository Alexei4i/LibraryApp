import Student from '../models/students.js';

// 1. Create Student (Already mostly correct!)
export const createStudents = async (req, res) => {
    try {
        const newStudent = await Student.create(req.body); 
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// 2. Get All Students
export const getStudent = async (req, res) => {
    try {
        const allStudents = await Student.find(); 
        res.status(200).json(allStudents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const foundStudent = await Student.findById(id);

        if (!foundStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(foundStudent);
    } catch (err) {
        // This catches errors if the ID provided is not a valid MongoDB ObjectId
        res.status(500).json({ message: "Invalid ID format", error: err.message });
    }
};

// 3. Delete Student (Fixed logic)
export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        // In MongoDB, we don't filter arrays; we tell the DB to remove the document
        const deletedStudent = await Student.findByIdAndDelete(id);
        
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: `Student ${deletedStudent.name} deleted` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// 4. Update Student (Fixed logic)
export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        // findByIdAndUpdate replaces the need to manually find, check, and re-assign
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { 
            new: true, 
            runValidators: true 
        });

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};