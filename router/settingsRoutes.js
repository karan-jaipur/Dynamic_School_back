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
router.put(
  '/',
  auth,
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'favicon', maxCount: 1 },
    { name: 'principalPhoto', maxCount: 1 }
  ]),
  settingsController.updateSettings
);

module.exports = router;
