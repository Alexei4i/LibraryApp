import express from 'express';
import mongoose from 'mongoose';
// Note: body-parser is now built into express, so we can simplify!
import bookRoutes from './routes/bookRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import attendantRoutes from './routes/attendantRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = 'mongodb://localhost:27017/libraryDB';

// 1. Improved Database Connection Logic
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB...'))
  .catch(err => console.error('❌ Could not connect to MongoDB:', err));

// 2. Modern Middleware
app.use(express.json()); 

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Library API!');
});

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/students', studentRoutes);
app.use('/attendants', attendantRoutes);

// 3. Global Error Handler (Crucial for Debugging)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server Running on: http://localhost:${PORT}`);
});