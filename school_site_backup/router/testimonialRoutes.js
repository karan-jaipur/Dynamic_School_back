const express = require('express');
const router = express.Router();
const testimonialController = require('../controller/testimonialController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   POST /api/testimonials
// @desc    Create new testimonial
// @access  Private
router.post('/', auth, upload.single('image'), testimonialController.createTestimonial);

// @route   GET /api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get('/', testimonialController.getAllTestimonials);


// @route   PUT /api/testimonials/:id
// @desc    Update testimonial
// @access  Private
router.put('/:id', auth, upload.single('image'), testimonialController.updateTestimonial);

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial
// @access  Private
router.delete('/:id', auth, testimonialController.deleteTestimonial);

module.exports = router;
