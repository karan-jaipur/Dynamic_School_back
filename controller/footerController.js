const Footer = require('../model/Footer');

// Get footer
exports.getFooter = async (req, res) => {
  try {
    let footer = await Footer.findById('footer_content');
    
    // Create default footer if not exists
    if (!footer) {
      footer = new Footer({ _id: 'footer_content' });
      await footer.save();
    }
    
    res.json({
      success: true,
      data: footer
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update footer
exports.updateFooter = async (req, res) => {
  try {
    let footer = await Footer.findByIdAndUpdate(
      'footer_content',
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Footer updated successfully',
      data: footer
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
