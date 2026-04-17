import mongoose from 'mongoose';

const libraryAttendantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Attendant name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Attendant email is required'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    attendantId: {
        type: String,
        required: [true, 'Unique Attendant ID is required'],
        unique: true,
        uppercase: true, // Standardizes IDs like 'STAFF01'
        trim: true
    },
    role: {
        type: String,
        enum: ['junior', 'senior', 'manager'],
        default: 'junior'
    }
}, { 
    timestamps: true 
});

// Using 'Attendant' (Capitalized) to match your Book model's ref: 'Attendant'
export default mongoose.model('Attendant', libraryAttendantSchema);