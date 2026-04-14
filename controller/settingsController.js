const Settings = require('../model/Settings');

// Get settings
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findById('global_settings');
    
    // Create default settings if not exists
    if (!settings) {
      settings = new Settings({ _id: 'global_settings' });
      await settings.save();
    }
    
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update settings
exports.updateSettings = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.files?.logo?.[0]) {
      updateData.logo = req.files.logo[0].path;
    }
    if (req.files?.favicon?.[0]) {
      updateData.favicon = req.files.favicon[0].path;
    }
    if (req.files?.principalPhoto?.[0]) {
      updateData.principalPhoto = req.files.principalPhoto[0].path;
    }
    
    let settings = await Settings.findByIdAndUpdate(
      'global_settings',
      updateData,
      { new: true, upsert: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
