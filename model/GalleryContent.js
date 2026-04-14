const mongoose = require('mongoose');

const galleryContentSchema = new mongoose.Schema(
  {
    pageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Page',
      required: true,
      unique: true,
    },
    intro: {
      type: String,
      required: true,
      trim: true,
    },
    featured_albums: {
      type: [String],
      default: [],
    },
    gallery_note: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('GalleryContent', galleryContentSchema);
