const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  // Singleton pattern - only one document
  _id: {
    type: String,
    default: 'global_settings'
  },
  themeColor: {
    type: String,
    default: '#1E3A8A'
  },
  accentColor: {
    type: String,
    default: '#FACC15'
  },
  fontFamily: {
    type: String,
    default: 'Inter'
  },
  animationsEnabled: {
    type: Boolean,
    default: true
  },
  seoTitle: {
    type: String,
    default: 'Malhotra Public School - Learning Today, Leading Tomorrow'
  },
  seoDescription: {
    type: String,
    default: 'Premier educational institution in Kotputli, Rajasthan since 2008'
  },
  googleAnalytics: {
    type: String,
    default: ''
  },
  logo: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);
