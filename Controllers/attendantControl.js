import {v4 as uuidv4} from 'uuid';
import attendants from '../models/attendants.js';

export const createAttendants = (req, res) => {
    const attendant = req.body;

    attendants.push({ ...attendant, id: uuidv4()});

    res.send(`Attendant with the name ${attendant.name} added !`)
};
export const getAttendant = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Use the model to FIND the specific data object
        const attendantData = await attendants.findById(id); 

        // Check if the attendant actually exists
        if (!attendantData) {
            return res.status(404).json({ message: "Attendant not found" });
        }

        // Send the attendantData (the object), NOT the Attendant (the model)
        res.status(200).json(attendantData); 
    } catch (err) {
        // This catches errors like invalid ID formats
        res.status(500).json({ message: err.message });
    }
};
export const getAttendantById = async (req, res) => {
    const { id } = req.params;

    const foundAttendant = await attendants.findById(id);

    if (!foundAttendant) {
        return res.status(404).send('Attendant not found');
    }
    res.send(foundAttendant);
};
export const deleteAttendant = async (req, res) => {
    const { id } = req.params;

    await attendants.findByIdAndDelete(id);
    res.send('Attendant deleted');
};
export const updateAttendant = async (req, res) => {
    const { id } = req.params; // we extract the id parameter from the request parameters using destructuring assignment. This gives us access to the id value that was passed in the URL when the request is made.

    const { name, email } = req.body; // we extract the updated attendant data from the request body.

    const attendant = await attendants.findById(id); // we search for the attendant in the attendants array using the find method. We compare the id of each attendant with the id extracted from the request parameters to find the matching attendant.

    if(!attendant) { // if the attendant is not found (i.e., if the find method returns undefined), we return a 404 status code with a message indicating that the attendant was not found.
        return res.status(404).send('Attendant not found');
    }
    if(name) attendant.name = name; // if the name field is provided in the request body, we update the attendant's name property with the new value.
    if(email) attendant.email = email; // if the email field is provided in the request body, we update the attendant's email property with the new value.
    res.send('Attendant updated');
};
