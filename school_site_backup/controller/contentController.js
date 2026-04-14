const ContentMap = require('../model/ContentMap');

exports.getPageContent = async (req, res, next) => {
  try {
    const key = req.params.pageKey || 'home';
    const doc = await ContentMap.findOne({ key });
    res.json({
      success: true,
      data: doc ? doc.content : null
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePageContent = async (req, res, next) => {
  try {
    const key = req.params.pageKey || 'home';
    const payload = req.body;
    
    // STRICT FIX: Never store gallery in DB content payloads
    if (key === 'home' && payload.gallery) {
      delete payload.gallery;
    }

    const doc = await ContentMap.findOneAndUpdate(
      { key },
      { $set: { content: payload } },
      { new: true, upsert: true }
    );
    res.json({
      success: true,
      message: `${key} content payload successfully saved.`,
      data: doc.content
    });
  } catch (error) {
    next(error);
  }
};
