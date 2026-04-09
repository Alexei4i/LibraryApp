import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import attendantRoutes from './routes/attendantRoutes.js';

mongoose.connect('mongodb://localhost:27017/libraryDB');

// Create an instance of the Express application and the port number for the server to listen on. 
const app = express();
const PORT = 5000;

// Middleware to parse incoming request bodies in JSON format
app.use(bodyParser.json());

// Use the imported booksRoutes for any requests that start with /books
app.use('/books', bookRoutes);

app.use('/authors', authorRoutes);

app.use('/students', studentRoutes);

app.use('/attendants', attendantRoutes);

// Define a route for the root URL(homepage) and send a response when it is accessed.  
app.get('/', (req,res) => {
    console.log('How nice!');
    res.send('Homepage. How may I help you?');
});
// Initialize the server to listen on the specified port
app.listen(PORT, () => {
  console.log(`Server Running on port: http://localhost:${PORT}`)
});
