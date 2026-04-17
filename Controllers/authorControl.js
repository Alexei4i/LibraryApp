import Author from '../models/authors.js'; // Note: Imported as 'Author' for clarity

// 1. Create Author (Async version)
export const createAuthors = async (req, res) => {
    try {
        const newAuthor = new Author(req.body); // Create instance from request body
        const savedAuthor = await newAuthor.save(); // Save to database
        res.status(201).json(savedAuthor); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// 2. Get All Authors
export const getAuthor = async (req, res) => {
    try {
        const allAuthors = await Author.find(); // Find() with no arguments gets everything
        res.status(200).json(allAuthors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// 3. Get Author by ID
export const getAuthorById = async (req, res) => {
    try {
        const { id } = req.params;
        const foundAuthor = await Author.findById(id);
        if (!foundAuthor) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json(foundAuthor);
    } catch (err) {
        res.status(500).json({ message: 'Invalid ID format or Server Error' });
    }
}

// 4. Delete Author
export const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Author.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// 5. Update Author
export const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        // { new: true } returns the updated document instead of the old one
        // { runValidators: true } ensures the update follows your schema rules
        const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, { 
            new: true, 
            runValidators: true 
        });

        if (!updatedAuthor) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json(updatedAuthor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}