const Page = require('../model/Page');
const Section = require('../model/Section');

// Create page
exports.createPage = async (req, res) => {
  try {
    const page = new Page(req.body);
    await page.save();
    res.status(201).json({
      success: true,
      message: 'Page created successfully',
      data: page
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get all pages
exports.getAllPages = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const pages = await Page.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: pages
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get page by slug with sections
exports.getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) {
      return res.status(404).json({ 
        success: false, 
        message: 'Page not found' 
      });
    }
    
    const sections = await Section.find({ pageId: page._id, isVisible: true })
      .sort({ order: 1 });
    
    res.json({
      success: true,
      data: {
        ...page.toObject(),
        sections
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update page
exports.updatePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!page) {
      return res.status(404).json({ 
        success: false, 
        message: 'Page not found' 
      });
    }
    res.json({
      success: true,
      message: 'Page updated successfully',
      data: page
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete page
exports.deletePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) {
      return res.status(404).json({ 
        success: false, 
        message: 'Page not found' 
      });
    }
    // Delete associated sections
    await Section.deleteMany({ pageId: page._id });
    
    res.json({
      success: true,
      message: 'Page deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
