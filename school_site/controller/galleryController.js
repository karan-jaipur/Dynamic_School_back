const Gallery = require('../model/Gallery');

// Create gallery
exports.createGallery = async (req, res) => {
  try {

    const { category, title, description } = req.body;

    let images = [];

    if (req.files && req.files.length > 0) {
      images = req.files.map(file => ({
        url: file.path,
        caption: ''
      }));
    }

    // check category already exists
    let gallery = await Gallery.findOne({ category });

    if (gallery) {

      // push images to existing category
      gallery.images.push(...images);

      await gallery.save();

      return res.status(200).json({
        success: true,
        message: "Images added to existing category",
        data: gallery
      });

    } else {

      // create new category gallery
      gallery = new Gallery({
        category,
        title,
        description,
        images
      });

      await gallery.save();

      return res.status(201).json({
        success: true,
        message: "Gallery created successfully",
        data: gallery
      });
    }

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// add category
exports.  addCategory = async (req, res) => {
  try {

    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category name is required"
      });
    }

    // check if category already exists
    const existing = await Gallery.findOne({ category });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Category already exists"
      });
    }

    // create category document
    const newCategory = new Gallery({
      category: category,
      title: category,
      description: "",
      images: []
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
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
    const galleries = await Gallery.find({ category: req.params.category })
      .sort({ date: -1 });
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
    const categories = await Gallery.distinct('category');
    res.json({
      success: true,
      data: categories
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
