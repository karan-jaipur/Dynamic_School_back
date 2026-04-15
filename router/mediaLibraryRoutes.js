const express = require('express');
const mediaLibraryController = require('../controller/mediaLibraryController');

const router = express.Router();

router.get('/', mediaLibraryController.listMediaAssets);

module.exports = router;
