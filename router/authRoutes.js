const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const auth = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register new admin
// @access  Public (should be protected in production)
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Login admin
// @access  Public
router.post('/login', authController.login);

// @route   GET /api/auth/verify
// @desc    Verify JWT token
// @access  Private
router.get('/verify', auth, authController.verifyToken);

module.exports = router;
