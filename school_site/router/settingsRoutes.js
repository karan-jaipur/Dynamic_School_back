const express = require('express');
const router = express.Router();
const settingsController = require('../controller/settingsController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/settings
// @desc    Get global settings
// @access  Public
router.get('/', settingsController.getSettings);

// @route   PUT /api/settings
// @desc    Update global settings
// @access  Private
router.put('/', auth, upload.single('logo'), settingsController.updateSettings);

module.exports = router;
