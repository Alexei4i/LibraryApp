import {v4 as uuidv4} from 'uuid';
import students from '../models/students.js';

export const createStudents = (req, res) => {
    const student = req.body;
    students.push({ ...student, id: uuidv4()});
    res.send(`Student with the name ${student.name} added !`)
}
export const getStudent = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Use the model to FIND the specific data object
        const studentData = await students.findById(id); 

        // Check if the student actually exists
        if (!studentData) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Send the studentData (the object), NOT the Student (the model)
        res.status(200).json(studentData); 
    } catch (err) {
        // This catches errors like invalid ID formats
        res.status(500).json({ message: err.message });
    }
}
export const getStudentById = async (req, res) => {
    const { id } = req.params;
    const foundStudent = await students.findById(id);
    if (!foundStudent) {
        return res.status(404).send('Student not found');
    }
    res.send(foundStudent);
}
export const deleteStudent = (req, res) => {
    const { id } = req.params;
    students = students.filter((student) => student.id !== id);
    res.send('Student deleted');
}
export const updateStudent = (req, res) => {
    const { id } = req.params; // we extract the id parameter from the request parameters using destructuring assignment. This gives us access to the id value that was passed in the URL when the request is made.
    const { name, email } = req.body; // we extract the updated student data from the request body.
    const student = students.find((student) => student.id === id);
    if(!student) { // if the student is not found (i.e., if the find method returns undefined), we return a 404 status code with a message indicating that the student was not found.
        return res.status(404).send('Student not found');
    }   
    if(name) student.name = name; // if the name field is provided in the request body, we update the student's name property with the new value.
    if(email) student.email = email; // if the email field is provided in the request body, we update the student's email property with the new value.
    res.send('Student updated');
};