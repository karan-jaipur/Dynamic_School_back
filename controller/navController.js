const NavItem = require('../model/NavItem');

// Create nav item
exports.createNavItem = async (req, res) => {
  try {
    const navItem = new NavItem(req.body);
    await navItem.save();
    res.status(201).json({
      success: true,
      message: 'Navigation item created successfully',
      data: navItem
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get all nav items
exports.getAllNavItems = async (req, res) => {
  try {
    const navItems = await NavItem.find().sort({ order: 1 });
    res.json({
      success: true,
      data: navItems
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update nav item
exports.updateNavItem = async (req, res) => {
  try {
    const navItem = await NavItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!navItem) {
      return res.status(404).json({ 
        success: false, 
        message: 'Navigation item not found' 
      });
    }
    res.json({
      success: true,
      message: 'Navigation item updated successfully',
      data: navItem
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete nav item
exports.deleteNavItem = async (req, res) => {
  try {
    const navItem = await NavItem.findByIdAndDelete(req.params.id);
    if (!navItem) {
      return res.status(404).json({ 
        success: false, 
        message: 'Navigation item not found' 
      });
    }
    res.json({
      success: true,
      message: 'Navigation item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Reorder nav items
exports.reorderNavItems = async (req, res) => {
  try {
    const { navItems } = req.body;
    const updatePromises = navItems.map(({ id, order }) =>
      NavItem.findByIdAndUpdate(id, { order })
    );
    await Promise.all(updatePromises);
    res.json({
      success: true,
      message: 'Navigation items reordered successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
