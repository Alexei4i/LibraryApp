// Import UUID for unique IDs
import { v4 as uuidv4 } from 'uuid';
import books from '../models/books.js';

export const createBooks = (req, res) => {

    const book = req.body;

    books.push({ ...book, id: uuidv4()});

    res.send(`Book with the title ${book.title} added !`)
};
export const getBook = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Use the model to FIND the specific data object
        const bookData = await books.findById(id); 

        // Check if the book actually exists
        if (!bookData) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Send the bookData (the object), NOT the Book (the model)
        res.status(200).json(bookData); 
    } catch (err) {
        // This catches errors like invalid ID formats
        res.status(500).json({ message: err.message });
    }
};
export const getBookById = async (req, res) => {
    const { id } = req.params;

    const foundBook = await books.findById(id);

    if (!foundBook) {
        return res.status(404).send('Book not found');
    }

    res.send(foundBook);
};
export const deleteBook = async (req, res) => {
    const { id } = req.params;

    await books.findByIdAndDelete(id);

    res.send(`Book with ID ${id} deleted!`);
};
export const updateBook = async (req, res) => {
    const { id } = req.params; // we extract the id parameter from the request parameters using destructuring assignment. This gives us access to the id value that was passed in the URL when the request is made.
    
    const { title, author, year } = req.body; // we extract the updated book data from the request body.

    const book = await books.findById(id); // we search for the book in the books array using the find method. We compare the id of each book with the id extracted from the request parameters to find the matching book.

    if(!book) { // if the book is not found (i.e., if the find method returns undefined), we return a 404 status code with a message indicating that the book was not found.
        return res.status(404).send('Book not found');
    }
    if(title) book.title = title; // if the title field is provided in the request body, we update the book's title property with the new value.
    if(author) book.author = author; // if the author field is provided in the request body, we update the book's author property with the new value.
    if(year) book.year = year; // if the year field is provided in the request body, we update the book's year property with the new value.

    res.send(`Book with ID ${id} has been updated!`); // Finally, we send a response indicating that the book with the specified ID has been updated.
};
export const borrowBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { studentId, attendantId, returnDate } = req.body; // 

        // 1. Find the book first to check its current status
        const book = await books.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // 2. RULE: Book must be "IN" to be borrowed 
        if (book.status !== "IN") {
            return res.status(400).json({ message: 'This book is already borrowed (OUT)' });
        }

        // 3. Update the book with borrowing details 
        book.status = "OUT";
        book.borrowedBy = studentId;
        book.issuedBy = attendantId;
        book.returnDate = returnDate;

        await book.save();

        // 4. Special Requirement: Populate details for the response 
        const populatedBook = await Book.findById(book._id)
            .populate("authors")
            .populate("borrowedBy")
            .populate("issuedBy");

        res.status(200).json(populatedBook);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const returnBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { studentId, attendantId, returnDate } = req.body; // we extract the book ID from the request parameters and the student ID and attendant ID from the request body.
        // 1. Find the book first to check its current status
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        // 2. Check if the book is currently borrowed
        if (book.status !== 'BORROWED') {
            return res.status(400).json({ message: 'Book is not currently borrowed' });
        }
        // 3. Update the book's status to "IN" and clear the borrowing details
        book.status = 'IN';
        book.borrowedBy = null;
        book.borrowedAt = null;
        book.returnDate = null;
        await book.save();
        res.json({ message: `Book with ID ${bookId} has been returned successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
