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
    const updateData = req.body;
    if (req.file) {
      updateData.logo = req.file.path;
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
