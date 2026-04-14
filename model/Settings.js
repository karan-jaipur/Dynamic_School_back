const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  // Singleton pattern - only one document
  _id: {
    type: String,
    default: 'global_settings'
  },
  schoolName: {
    type: String,
    default: ''
  },
  tagline: {
    type: String,
    default: ''
  },
  principalName: {
    type: String,
    default: ''
  },
  principalQualification: {
    type: String,
    default: ''
  },
  principalMessage: {
    type: String,
    default: ''
  },
  principalPhoto: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  mapEmbed: {
    type: String,
    default: ''
  },
  themeColor: {
    type: String,
    default: '#1E3A8A'
  },
  accentColor: {
    type: String,
    default: '#FACC15'
  },
  textColor: {
    type: String,
    default: '#0f172a'
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
  metaKeywords: {
    type: String,
    default: ''
  },
  googleAnalytics: {
    type: String,
    default: ''
  },
  logo: {
    type: String,
    default: ''
  },
  favicon: {
    type: String,
    default: ''
  },
  facebook: {
    type: String,
    default: ''
  },
  twitter: {
    type: String,
    default: ''
  },
  instagram: {
    type: String,
    default: ''
  },
  youtube: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);
