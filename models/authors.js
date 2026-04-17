import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true // Removes accidental whitespace
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true, // Ensures "User@Email.com" is saved as "user@email.com"
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] // Basic regex validation
  },
  bio: {
    type: String,
    maxLength: [500, 'Bio cannot be more than 500 characters']
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Use 'Author' (Capitalized) as the model name - it's a standard convention
export default mongoose.model('Author', authorSchema);