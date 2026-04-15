const Admission = require('../model/Admission');

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function buildAdmissionPayload(body = {}) {
  const source = body.source === 'contact' ? 'contact' : 'admission';

  if (source === 'contact') {
    return {
      source,
      studentName: normalizeText(body.studentName || body.name),
      parentName: '',
      email: normalizeText(body.email),
      phone: normalizeText(body.phone),
      class: '',
      dob: null,
      address: '',
      subject: normalizeText(body.subject) || 'Website Inquiry',
      message: normalizeText(body.message),
    };
  }

  return {
    source,
    studentName: normalizeText(body.studentName || body.name),
    parentName: normalizeText(body.parentName || body.fatherName),
    email: normalizeText(body.email),
    phone: normalizeText(body.phone),
    class: normalizeText(body.class),
    dob: body.dob || null,
    address: normalizeText(body.address),
    subject: '',
    message: '',
  };
}

// Create admission application
exports.createAdmission = async (req, res) => {
  try {
    const payload = buildAdmissionPayload(req.body);
    const admission = new Admission(payload);
    await admission.save();
    res.status(201).json({
      success: true,
      message: payload.source === 'contact'
        ? 'Contact enquiry submitted successfully'
        : 'Admission application submitted successfully',
      data: admission
    });
  } catch (error) {
    res.status(400).json({ 
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
