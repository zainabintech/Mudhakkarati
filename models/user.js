const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
    },
    title: {
      type: String,
      required: true
      },

  imageUrl: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  viewType: {
    type: String,
    enum: ['private', 'shared'], 
    default: 'private',
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










