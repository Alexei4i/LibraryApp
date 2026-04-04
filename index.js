import express from 'express';
import bodyParser from 'body-parser';

//import the books routes from the books.js file in the routes directory
import booksRoutes from './routes/books.js';

// Create an instance of the Express application and the port number for the server to listen on. 
const app = express();
const PORT = 5000;

// Middleware to parse incoming request bodies in JSON format
app.use(bodyParser.json());

// Use the imported booksRoutes for any requests that start with /books
app.use('/books', booksRoutes);

// Define a route for the root URL(homepage) and send a response when it is accessed.  
app.get('/', (req,res) => {
    console.log('Come onnnnn');
    res.send('Hello People');
});
// Initialize the server to listen on the specified port
app.listen(PORT, () => {
  console.log(`Server Running on port: http://localhost:${PORT}`)
});
