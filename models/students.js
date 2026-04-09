import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    enrolledDate: {
        type: Date,
        default: Date.now
    }
});
export default mongoose.model('students', studentSchema);