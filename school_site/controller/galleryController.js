const Gallery = require('../model/Gallery');

// Create gallery
exports.createGallery = async (req, res) => {
  try {

    const { category, title, description } = req.body;

    const normalizedCategory = category.trim().toLowerCase();

    let images = [];

    if (req.files && req.files.length > 0) {
      images = req.files.map(file => ({
        url: file.path,
        caption: ''
      }));
    }

    const newGallery = new Gallery({
      category: normalizedCategory,
      title,
      description,
      images
    });

    await newGallery.save();

    return res.status(201).json({
      success: true,
      message: "Gallery created successfully",
      data: newGallery
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// add category
exports.addCategory = async (req, res) => {

  const { category } = req.body;

  if (!category || !category.trim()) {
    return res.status(400).json({
      success: false,
      message: "Category name is required"
    });
  }

  // normalize (IMPORTANT)
  const normalizedCategory = category.trim().toLowerCase();

  // check existing (case-insensitive)
  const existing = await Gallery.findOne({
    category: normalizedCategory
  });

  if (existing) {
    return res.status(400).json({
      success: false,
      message: "Category already exists"
    });
  }

  // create category (dummy entry but controlled)
  const newCategory = new Gallery({
    category: normalizedCategory,
    title: normalizedCategory,
    description: "CATEGORY_ONLY", // marker (IMPORTANT)
    images: []
  });

  await newCategory.save();

  return res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: newCategory
  });
};

// Get all galleries
exports.getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ date: -1 });
    res.json({
      success: true,
      data: galleries
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get galleries by category
exports.getByCategory = async (req, res) => {
  try {

    const category = req.params.category.trim().toLowerCase();

    const galleries = await Gallery.find({
      category: category,
      description: { $ne: "CATEGORY_ONLY" } // exclude fake ones
    }).sort({ date: -1 });

    res.json({
      success: true,
      data: galleries
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {

    const categories = await Gallery.aggregate([
      {
        $group: {
          _id: { $toLower: "$category" }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id"
        }
      },
      {
        $sort: { category: 1 }
      }
    ]);

    res.json({
      success: true,
      data: categories.map(c => c.category)
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update gallery
exports.updateGallery = async (req, res) => {
  try {
    const updateData = req.body;
    
    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        url: file.path,
        caption: ''
      }));
      updateData.images = [...(updateData.images || []), ...newImages];
    }
    
    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!gallery) {
      return res.status(404).json({ 
        success: false, 
        message: 'Gallery not found' 
      });
    }
    res.json({
      success: true,
      message: 'Gallery updated successfully',
      data: gallery
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete gallery
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) {
      return res.status(404).json({ 
        success: false, 
        message: 'Gallery not found' 
      });
    }
    res.json({
      success: true,
      message: 'Gallery deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
