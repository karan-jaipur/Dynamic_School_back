const mongoose = require('mongoose');

const admissionPageContentSchema = new mongoose.Schema(
  {
    pageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Page',
      required: true,
      unique: true,
    },
    eligibility: {
      type: String,
      required: true,
      trim: true,
    },
    fees: {
      type: String,
      required: true,
      trim: true,
    },
    admission_process: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AdmissionPageContent', admissionPageContentSchema);
