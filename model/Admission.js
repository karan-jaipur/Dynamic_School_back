const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  source: {
    type: String,
    enum: ['admission', 'contact'],
    default: 'admission'
  },
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  parentName: {
    type: String,
    required: function requiredParent() {
      return this.source === 'admission';
    },
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: function requiredPhone() {
      return this.source === 'admission';
    },
    trim: true
  },
  class: {
    type: String,
    required: function requiredClass() {
      return this.source === 'admission';
    }
  },
  dob: {
    type: Date,
    required: function requiredDob() {
      return this.source === 'admission';
    }
  },
  address: {
    type: String,
    required: function requiredAddress() {
      return this.source === 'admission';
    }
  },
  subject: {
    type: String,
    trim: true,
    default: ''
  },
  message: {
    type: String,
    trim: true,
    default: ''
  },
  isContacted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Admission', admissionSchema);
