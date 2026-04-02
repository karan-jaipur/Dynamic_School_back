const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: '',
    },
    size_bytes: {
      type: Number,
      required: true,
      max: 2 * 1024 * 1024,
    },
  },
  { _id: false }
);

const statSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
      required: true,
    },
    value: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { _id: false }
);

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    quote: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { _id: false }
);

const buttonSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
      required: true,
      maxlength: 30,
    },
    link: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { _id: false }
);

const sectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['hero', 'content', 'gallery', 'extra'],
    },
    order: {
      type: Number,
      required: true,
      min: 1,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    subtitle: {
      type: String,
      trim: true,
      default: '',
    },
    content: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: '',
    },
    image: {
      type: String,
      trim: true,
      default: '',
    },
    buttons: {
      type: [buttonSchema],
      default: [],
    },
    text: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: '',
    },
    images: {
      type: [imageSchema],
      validate: {
        validator(value) {
          return (value || []).length <= 10;
        },
        message: 'A gallery section can contain at most 10 images',
      },
      default: [],
    },
    layout: {
      type: String,
      enum: ['grid-1', 'grid-2'],
      default: 'grid-1',
    },
    stats: {
      type: [statSchema],
      default: [],
    },
    testimonials: {
      type: [testimonialSchema],
      default: [],
    },
  },
  { _id: false }
);

const pageContentSchema = new mongoose.Schema(
  {
    page_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Page',
      required: true,
      unique: true,
    },
    sections: {
      type: [sectionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PageContent', pageContentSchema);
