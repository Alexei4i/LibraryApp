import Attendant from '../models/attendants.js';

// 1. Create Attendant - Switched to Async/MongoDB
export const createAttendants = async (req, res) => {
    try {
        // MongoDB handles the unique ID automatically via _id
        const newAttendant = await Attendant.create(req.body);
        res.status(201).json(newAttendant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 2. Get All Attendants
export const getAttendant = async (req, res) => {
    try {
        const allAttendants = await Attendant.find();
        res.status(200).json(allAttendants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// 1. Check for 'export' keyword
// 2. Ensure it's 'getAttendantById' (matching your routes)
export const getAttendantById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Using the MongoDB findById method
        const foundAttendant = await Attendant.findById(id);

        if (!foundAttendant) {
            return res.status(404).json({ message: 'Attendant not found' });
        }

        res.status(200).json(foundAttendant);
    } catch (err) {
        // Catches errors like "CastError" if the ID is formatted incorrectly
        res.status(500).json({ message: "Invalid ID format", error: err.message });
    }
};

// 3. Update Attendant - Simplified using findByIdAndUpdate
export const updateAttendant = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Attendant.findByIdAndUpdate(id, req.body, { 
            new: true, 
            runValidators: true 
        });

        if (!updated) return res.status(404).json({ message: 'Attendant not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const deleteAttendant = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Attendant.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Attendant not found' });
        }

        res.status(200).json({ message: `Attendant with ID ${id} deleted!` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Note: Your getAttendantById and deleteAttendant were already 
// using the correct MongoDB methods!