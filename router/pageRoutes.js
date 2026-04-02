const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pageController = require('../controller/pageController');

router.get('/user', pageController.getUserPages);
router.post('/', auth, pageController.createPage);
router.get('/', auth, pageController.listAdminPages);
router.get('/:id', auth, pageController.getAdminPage);
router.put('/:id', auth, pageController.updatePage);
router.put('/:id/content', auth, pageController.savePageContent);

module.exports = router;
