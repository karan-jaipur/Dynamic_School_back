const express = require('express');
const router = express.Router();
const sectionController = require('../controller/sectionController');
const auth = require('../middleware/auth');

// @route   POST /api/sections
// @desc    Create new section
// @access  Private
router.post('/', auth, sectionController.createSection);

// @route   GET /api/sections/page/:pageId
// @desc    Get sections by page ID
// @access  Public
router.get('/page/:pageId', sectionController.getSectionsByPage);

// @route   PUT /api/sections/:id
// @desc    Update section
// @access  Private
router.put('/:id', auth, sectionController.updateSection);

// @route   DELETE /api/sections/:id
// @desc    Delete section
// @access  Private
router.delete('/:id', auth, sectionController.deleteSection);

// @route   POST /api/sections/reorder
// @desc    Reorder sections
// @access  Private
router.post('/reorder', auth, sectionController.reorderSections);

module.exports = router;
