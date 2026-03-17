const mongoose = require('mongoose');

const navItemSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  isExternal: {
    type: Boolean,
    default: false
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NavItem',
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('NavItem', navItemSchema);
