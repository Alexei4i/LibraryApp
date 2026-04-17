import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Student name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Student email is required'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    age: {
        type: Number,
        min: [5, 'Student must be at least 5 years old'], // Typical library age
        max: [100, 'Please enter a valid age']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { 
    timestamps: true 
});

export default mongoose.model('Student', studentSchema);