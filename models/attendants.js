import mongoose from 'mongoose';

const libraryAttendantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    shift: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Evening'],
        required: true
    }
});
export default mongoose.model('attendants', libraryAttendantSchema);