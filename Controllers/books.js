// Import UUID for unique IDs
import { v4 as uuidv4 } from 'uuid';
// In-memory array to store books (this will be replaced by a database in a real application)
let books = [];

export const createBooks = (req, res) => {

    const book = req.body;

    books.push({ ...book, id: uuidv4()});

    res.send(`Book with the title ${book.title} added !`)
};
export const getBook = (req, res) => {
    console.log(books);
    res.send(books);
};
export const getBookById = (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
        return res.status(404).send('User not found');
    }

    res.send(foundUser);
};
export const deleteBook = (req, res) => {
    const { id } = req.params;

    books = books.filter((book) => book.id !== id);

    res.send(`Book with ID ${id} deleted!`);
};
export const updateBook = (req, res) => {
    const { id } = req.params; // we extract the id parameter from the request parameters using destructuring assignment. This gives us access to the id value that was passed in the URL when the request is made.
    
    const { title, author, year } = req.body; // we extract the updated book data from the request body.

    const book = books.find((book) => book.id === id); // we search for the book in the books array using the find method. We compare the id of each book with the id extracted from the request parameters to find the matching book.

    if(!book) { // if the book is not found (i.e., if the find method returns undefined), we return a 404 status code with a message indicating that the book was not found.
        return res.status(404).send('Book not found');
    }
    if(title) book.title = title; // if the title field is provided in the request body, we update the book's title property with the new value.
    if(author) book.author = author; // if the author field is provided in the request body, we update the book's author property with the new value.
    if(year) book.year = year; // if the year field is provided in the request body, we update the book's year property with the new value.

    res.send(`Book with ID ${id} has been updated!`); // Finally, we send a response indicating that the book with the specified ID has been updated.
};
