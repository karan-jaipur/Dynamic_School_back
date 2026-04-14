const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
  // Singleton pattern
  _id: {
    type: String,
    default: 'footer_content'
  },
  address: {
    type: String,
    default: 'Kotputli, Rajasthan'
  },
  phone: {
    type: String,
    default: '+91-XXXXXXXXXX'
  },
  email: {
    type: String,
    default: 'info@malhotrapublicschool.com'
  },
  mapUrl: {
    type: String,
    default: ''
  },
  socialLinks: [{
    platform: String,
    url: String,
    icon: String
  }],
  copyrightText: {
    type: String,
    default: '© 2026 Malhotra Public School. All rights reserved.'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Footer', footerSchema);
