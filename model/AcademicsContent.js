const mongoose = require('mongoose');

const academicsContentSchema = new mongoose.Schema(
  {
    pageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Page',
      required: true,
      unique: true,
    },
    overview: {
      type: String,
      required: true,
      trim: true,
    },
    curriculum: {
      type: [String],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AcademicsContent', academicsContentSchema);
