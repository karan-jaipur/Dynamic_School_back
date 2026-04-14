const express = require('express');
const router = express.Router();
const bannerController = require('../controller/bannerController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   POST /api/banners
// @desc    Create new banner
// @access  Private
router.post('/', auth, upload.single('image'), bannerController.createBanner);

// @route   GET /api/banners
// @desc    Get all banners
// @access  Public
router.get('/', bannerController.getAllBanners);

// @route   PUT /api/banners/:id
// @desc    Update banner
// @access  Private
router.put('/:id', auth, upload.single('image'), bannerController.updateBanner);

// @route   DELETE /api/banners/:id
// @desc    Delete banner
// @access  Private
router.delete('/:id', auth, bannerController.deleteBanner);

// @route   POST /api/banners/reorder
// @desc    Reorder banners
// @access  Private
router.post('/reorder', auth, bannerController.reorderBanners);

module.exports = router;
