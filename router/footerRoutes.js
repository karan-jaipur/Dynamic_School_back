const express = require('express');
const router = express.Router();
const footerController = require('../controller/footerController');
const auth = require('../middleware/auth');

// @route   GET /api/footer
// @desc    Get footer content
// @access  Public
router.get('/', footerController.getFooter);

// @route   PUT /api/footer
// @desc    Update footer content
// @access  Private
router.put('/', auth, footerController.updateFooter);

module.exports = router;
