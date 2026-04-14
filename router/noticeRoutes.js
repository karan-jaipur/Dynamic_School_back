const express = require('express');
const router = express.Router();
const noticeController = require('../controller/noticeController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   POST /api/notices
// @desc    Create new notice
// @access  Private
router.post('/', auth, upload.single('attachment'), noticeController.createNotice);

// @route   GET /api/notices
// @desc    Get all notices
// @access  Public
router.get('/', noticeController.getAllNotices);

// @route   GET /api/notices/highlighted
// @desc    Get highlighted notices
// @access  Public
router.get('/highlighted', noticeController.getHighlightedNotices);

// @route   PUT /api/notices/:id
// @desc    Update notice
// @access  Private
router.put('/:id', auth, upload.single('attachment'), noticeController.updateNotice);

// @route   DELETE /api/notices/:id
// @desc    Delete notice
// @access  Private
router.delete('/:id', auth, noticeController.deleteNotice);

module.exports = router;
