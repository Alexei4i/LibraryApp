import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author', // Ensure this matches the string in your Author model
    required: [true, 'A book must have an author']
  },
  publishedDate: {
    type: Date
  },
  pages: {
    type: Number,
    min: [1, 'A book must have at least 1 page']
  },
  isbn: {
    type: String, // Changed from Number to String
    unique: true,
    required: [true, 'ISBN is required'],
    trim: true
  },
  status: { 
    type: String,
    enum: ['available', 'borrowed'],
    default: 'available'
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    default: null
  },
  issuedBy: { // Changed from IssuedBy to issuedBy (camelCase)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attendant',
    default: null
  },
  returnDate: {
    type: Date
  }
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);