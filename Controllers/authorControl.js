import {v4 as uuidv4} from 'uuid';
import authors from '../models/authors.js';

export const createAuthors = (req, res) => {
    const author = req.body;
    authors.push({ ...author, id: uuidv4()});
    res.send(`Author with the name ${author.name} added !`)
}
export const getAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Use the model to FIND the specific data object
        const authorData = await Author.findById(id); 

        // Check if the author actually exists
        if (!authorData) {
            return res.status(404).json({ message: "Author not found" });
        }

        // Send the authorData (the object), NOT the Author (the model)
        res.status(200).json(authorData); 
    } catch (err) {
        // This catches errors like invalid ID formats
        res.status(500).json({ message: err.message });
    }
}
export const getAuthorById = async (req, res) => {
    const { id } = req.params;
    const foundAuthor = await Author.findById(id);
    if (!foundAuthor) {
        return res.status(404).send('Author not found');
    }
    res.send(foundAuthor);
}  
export const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    await Author.findByIdAndDelete(id);
    res.send('Author deleted');
}
export const updateAuthor = async (req, res) => {
    const { id } = req.params; // we extract the id parameter from the request parameters using destructuring assignment. This gives us access to the id value that was passed in the URL when the request is made.

    const { name, bio } = req.body; // we extract the updated author data from the request body.
    const author = await Author.findById(id); // we search for the author in the authors array using the find method. We compare the id of each author with the id extracted from the request parameters to find the matching author.

    if(!author) { // if the author is not found (i.e., if the find method returns undefined), we return a 404 status code with a message indicating that the author was not found.
        return res.status(404).send('Author not found');
    }
    if(name) author.name = name; // if the name field is provided in the request body, we update the author's name property with the new value.
    if(bio) author.bio = bio; // if the bio field is provided in the request body, we update the author's bio property with the new value.
    res.send('Author updated');
}
