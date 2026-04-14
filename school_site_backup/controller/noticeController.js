const Notice = require('../model/Notice');

function toBoolean(value, defaultValue = false) {
  if (value === undefined || value === null || value === '') return defaultValue;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true') return true;
    if (normalized === 'false') return false;
  }
  return Boolean(value);
}

// Create notice
exports.createNotice = async (req, res) => {
  try {
    const notice = new Notice({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      attachmentUrl: req.file?.path || req.body.attachmentUrl || '',
      isHighlighted: toBoolean(req.body.isHighlighted, false),
      isPublished: toBoolean(req.body.isPublished, true),
    });
    await notice.save();
    res.status(201).json({
      success: true,
      message: 'Notice created successfully',
      data: notice
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get all notices
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json({
      success: true,
      data: notices
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get highlighted notices
exports.getHighlightedNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ isHighlighted: true, isPublished: true })
      .sort({ date: -1 })
      .limit(5);
    res.json({
      success: true,
      data: notices
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update notice
exports.updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notice not found' 
      });
    }

    notice.title = req.body.title ?? notice.title;
    notice.description = req.body.description ?? notice.description;
    notice.date = req.body.date ?? notice.date;
    notice.attachmentUrl = req.file?.path ?? req.body.attachmentUrl ?? notice.attachmentUrl ?? '';
    notice.isHighlighted = toBoolean(req.body.isHighlighted, notice.isHighlighted);
    notice.isPublished = toBoolean(req.body.isPublished, notice.isPublished);

    await notice.save();

    res.json({
      success: true,
      message: 'Notice updated successfully',
      data: notice
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete notice
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notice not found' 
      });
    }
    res.json({
      success: true,
      message: 'Notice deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
