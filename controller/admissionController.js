const Admission = require('../model/Admission');

// Create admission application
exports.createAdmission = async (req, res) => {
  try {
    const admission = new Admission(req.body);
    await admission.save();
    res.status(201).json({
      success: true,
      message: 'Admission application submitted successfully',
      data: admission
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Get all admissions
exports.getAllAdmissions = async (req, res) => {
  try {
    const { isContacted } = req.query;
    const filter = isContacted !== undefined ? { isContacted: isContacted === 'true' } : {};
    const admissions = await Admission.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: admissions
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update admission status
exports.updateAdmissionStatus = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { isContacted: req.body.isContacted },
      { new: true }
    );
    if (!admission) {
      return res.status(404).json({ 
        success: false, 
        message: 'Admission not found' 
      });
    }
    res.json({
      success: true,
      message: 'Admission status updated successfully',
      data: admission
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete admission
exports.deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndDelete(req.params.id);
    if (!admission) {
      return res.status(404).json({ 
        success: false, 
        message: 'Admission not found' 
      });
    }
    res.json({
      success: true,
      message: 'Admission deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Export to Excel (placeholder - requires xlsx package)
exports.exportToExcel = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    
    // This is a placeholder - frontend can handle CSV export
    // Or install xlsx package for Excel export
    res.json({
      success: true,
      message: 'Export feature - use frontend to convert to CSV/Excel',
      data: admissions
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
