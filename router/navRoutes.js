const express = require('express');
const router = express.Router();
const navController = require('../controller/navController');
const auth = require('../middleware/auth');

// @route   POST /api/nav
// @desc    Create new nav item
// @access  Private
router.post('/', auth, navController.createNavItem);

// @route   GET /api/nav
// @desc    Get all nav items
// @access  Public
router.get('/', navController.getAllNavItems);

// @route   PUT /api/nav/:id
// @desc    Update nav item
// @access  Private
router.put('/:id', auth, navController.updateNavItem);

// @route   DELETE /api/nav/:id
// @desc    Delete nav item
// @access  Private
router.delete('/:id', auth, navController.deleteNavItem);

// @route   POST /api/nav/reorder
// @desc    Reorder nav items
// @access  Private
router.post('/reorder', auth, navController.reorderNavItems);

module.exports = router;
