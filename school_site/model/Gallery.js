const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  images: [{
    url: String,
    caption: String
  }],
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
