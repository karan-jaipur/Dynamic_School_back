const express = require('express');
const router = express.Router();
const contentController = require('../controller/contentController');
const auth = require('../middleware/auth'); 

// Public route for UserPanel
router.get('/:pageKey', contentController.getPageContent);

// Protected route for AdminPanel
router.put('/:pageKey', auth, contentController.updatePageContent);

module.exports = router;
