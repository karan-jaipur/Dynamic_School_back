const mongoose = require('mongoose');

const contentMapSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: 'home'
    },
    content: {
      type: Object,
      default: {}
    }
  },
  { 
    timestamps: true, 
    strict: false // Allows dynamic CMS JSON payloads without explicit schemas
  }
);

module.exports = mongoose.model('ContentMap', contentMapSchema);
