const Banner = require('../model/Banner');

// Create banner
exports.createBanner = async (req, res) => {
  try {
    const bannerData = req.body;
    if (req.file) {
      bannerData.image = req.file.path;
    }
    const banner = new Banner(bannerData);
    await banner.save();
    res.status(201).json({
      success: true,
      message: 'Banner created successfully',
      data: banner
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get all banners
exports.getAllBanners = async (req, res) => {
  try {
    const { isActive } = req.query;
    const filter = isActive !== undefined ? { isActive: isActive === 'true' } : {};
    const banners = await Banner.find(filter).sort({ order: 1 });
    res.json({
      success: true,
      data: banners
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update banner
exports.updateBanner = async (req, res) => {
  try {
    const updateData = req.body;
    if (req.file) {
      updateData.image = req.file.path;
    }
    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!banner) {
      return res.status(404).json({ 
        success: false, 
        message: 'Banner not found' 
      });
    }
    res.json({
      success: true,
      message: 'Banner updated successfully',
      data: banner
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete banner
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({ 
        success: false, 
        message: 'Banner not found' 
      });
    }
    res.json({
      success: true,
      message: 'Banner deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Reorder banners
exports.reorderBanners = async (req, res) => {
  try {
    const { banners } = req.body;
    const updatePromises = banners.map(({ id, order }) =>
      Banner.findByIdAndUpdate(id, { order })
    );
    await Promise.all(updatePromises);
    res.json({
      success: true,
      message: 'Banners reordered successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
