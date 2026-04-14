const express = require('express');
const router = express.Router();
const admissionController = require('../controller/admissionController');
const auth = require('../middleware/auth');

// @route   POST /api/admissions
// @desc    Submit admission application
// @access  Public
router.post('/', admissionController.createAdmission);


// @route   GET /api/admissions
// @desc    Get all admissions
// @access  Public (admin panel list; protect with login in production if needed)
router.get('/', admissionController.getAllAdmissions);

// @route   PUT /api/admissions/:id/status
// @desc    Update admission contact status
// @access  Private
router.put('/:id/status', auth, admissionController.updateAdmissionStatus);

// @route   DELETE /api/admissions/:id
// @desc    Delete admission
// @access  Private
router.delete('/:id', auth, admissionController.deleteAdmission);

// @route   GET /api/admissions/export
// @desc    Export admissions to Excel
// @access  Private
router.get('/export', auth, admissionController.exportToExcel);

module.exports = router;
