const Section = require('../model/Section');

// Create section
exports.createSection = async (req, res) => {
  try {
    const section = new Section(req.body);
    await section.save();
    res.status(201).json({
      success: true,
      message: 'Section created successfully',
      data: section
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get sections by page ID
exports.getSectionsByPage = async (req, res) => {
  try {
    const sections = await Section.find({ pageId: req.params.pageId })
      .sort({ order: 1 });
    res.json({
      success: true,
      data: sections
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update section
exports.updateSection = async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!section) {
      return res.status(404).json({ 
        success: false, 
        message: 'Section not found' 
      });
    }
    res.json({
      success: true,
      message: 'Section updated successfully',
      data: section
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete section
exports.deleteSection = async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);
    if (!section) {
      return res.status(404).json({ 
        success: false, 
        message: 'Section not found' 
      });
    }
    res.json({
      success: true,
      message: 'Section deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Reorder sections
exports.reorderSections = async (req, res) => {
  try {
    const { sections } = req.body; // Array of { id, order }
    
    const updatePromises = sections.map(({ id, order }) =>
      Section.findByIdAndUpdate(id, { order })
    );
    
    await Promise.all(updatePromises);
    
    res.json({
      success: true,
      message: 'Sections reordered successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
