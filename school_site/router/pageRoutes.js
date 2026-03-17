const express = require('express');
const router = express.Router();
const pageController = require('../controller/pageController');
const auth = require('../middleware/auth');

// @route   POST /api/pages
// @desc    Create new page
// @access  Private
router.post('/', auth, pageController.createPage);

// @route   GET /api/pages
// @desc    Get all pages
// @access  Public
router.get('/', pageController.getAllPages);

// @route   GET /api/pages/:slug
// @desc    Get page by slug with sections
// @access  Public
router.get('/:slug', pageController.getPageBySlug);

// @route   PUT /api/pages/:id
// @desc    Update page
// @access  Private
router.put('/:id', auth, pageController.updatePage);

// @route   DELETE /api/pages/:id
// @desc    Delete page
// @access  Private
router.delete('/:id', auth, pageController.deletePage);

module.exports = router;
