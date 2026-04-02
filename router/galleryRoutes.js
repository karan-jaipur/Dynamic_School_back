const express = require('express');
const router = express.Router();
const galleryController = require('../controller/galleryController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   POST /api/gallery
// @desc    Create new gallery
// @access  Private
router.post('/', auth, upload.array('images', 10), galleryController.createGallery);


router.post('/addCateg', auth, galleryController.addCategory);

// @route   GET /api/gallery
// @desc    Get all galleries
// @access  Public
router.get('/', galleryController.getAllGalleries);

// @route   GET /api/gallery/categories
// @desc    Get all categories
// @access  Public
router.get('/categories', galleryController.getCategories);

// @route   GET /api/gallery/category/:category
// @desc    Get galleries by category
// @access  Public
router.get('/category/:category', galleryController.getByCategory);

// @route   PUT /api/gallery/:id
// @desc    Update gallery
// @access  Private
router.put('/:id', auth, upload.array('images', 10), galleryController.updateGallery);

// @route   DELETE /api/gallery/:id
// @desc    Delete gallery
// @access  Private
router.delete('/:id', auth, galleryController.deleteGallery);

module.exports = router;
