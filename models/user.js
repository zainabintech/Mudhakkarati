
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false, // Optional for journal entries that don't need images
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'neutral', 'excited', 'anxious'], // Example moods, adjust as needed
    required: false, // Optional mood tag
  },
  tags: {
    type: [String], // Allows multiple tags for categorization
    required: false,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [postSchema], 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
