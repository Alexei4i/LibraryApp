import Book from '../models/books.js';

// 1. Create Book
export const createBooks = async (req, res) => {
    try {
        // Note: Change 'authors' to 'author' to match your schema
        const { title, isbn, author, pages, publishedDate } = req.body; 
        
        const newBook = await Book.create({
            title,      
            isbn,       
            author, // This should be the MongoDB _id of an existing Author   
            pages,
            publishedDate,
            status: "available" 
        });

        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const getBook = async (req, res) => {
    try {
        // 1. Fetch all books from the database
        // 2. Use .populate() to turn Author/Student IDs into actual data
        const allBooks = await Book.find()
            .populate('author', 'name email') // Only get name and email from Author
            .populate('borrowedBy', 'name email');

        // 3. Send the data back
        res.status(200).json(allBooks);
    } catch (err) {
        // 4. Handle connection or query errors
        res.status(500).json({ message: "Error fetching books", error: err.message });
    }
};
// 1. Ensure 'export' is here
// 2. Ensure it's 'getBookById' (Singular 'Book', lowercase 'd')
export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Use populate so you see the Author's name instead of just their ID
        const foundBook = await Book.findById(id)
            .populate('author')
            .populate('borrowedBy');

        if (!foundBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(foundBook);
    } catch (err) {
        // This catch block is vital for handling "CastError" 
        // which happens if the ID string is the wrong length
        res.status(500).json({ message: "Invalid ID format", error: err.message });
    }
}; 
// 2. Borrow Book (The "Transition" Logic)
export const borrowBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { studentId, attendantId, returnDate } = req.body; 

        const book = await Book.findById(id);

        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (book.status === "borrowed") {
            return res.status(400).json({ message: 'This book is already out' });
        }

        // Update fields (Ensure these match your schema exactly!)
        book.status = "borrowed";
        book.borrowedBy = studentId;
        book.issuedBy = attendantId; // Use lowercase 'i' as per our schema fix
        book.returnDate = returnDate;

        await book.save();

        // Populate allows you to see the NAME of the author/student instead of just an ID
        const populatedBook = await Book.findById(book._id)
            .populate("author")
            .populate("borrowedBy")
            .populate("issuedBy");

        res.status(200).json(populatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 3. Update Book (Using the modern Mongoose way)
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { 
            new: true, 
            runValidators: true 
        });

        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const returnBook = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Find the book
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // 2. Check if it's actually borrowed
        if (book.status !== 'borrowed') {
            return res.status(400).json({ message: 'Book is not currently borrowed' });
        }

        // 3. Reset the fields to make it available again
        book.status = 'available';
        book.borrowedBy = null;
        book.issuedBy = null;
        book.returnDate = null;

        await book.save();

        res.status(200).json({ message: `Book "${book.title}" returned successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Ensure 'export' is at the very beginning!
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Book.findByIdAndDelete(id);
        
        if (!deleted) return res.status(404).json({ message: 'Book not found' });
        
        res.status(200).json({ message: `Book with ID ${id} deleted!` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};