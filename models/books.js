import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
    publishedDate: {
    type: Date
  },
  pages: {
    type: Number
  },
  isbn: {
    type: Number,
    unique: true
  }
});

export default mongoose.model('books', bookSchema);
