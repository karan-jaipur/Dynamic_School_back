const pageService = require('../services/pageService');

exports.createPage = async (req, res, next) => {
  try {
    const page = await pageService.createPage(req.body);
    res.status(201).json({
      success: true,
      message: 'Page created successfully',
      data: page,
    });
  } catch (error) {
    next(error);
  }
};

exports.listAdminPages = async (req, res, next) => {
  try {
    const pages = await pageService.listAdminPages();
    res.json({
      success: true,
      data: pages,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAdminPage = async (req, res, next) => {
  try {
    const page = await pageService.getAdminPage(req.params.id);
    res.json({
      success: true,
      data: page,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePage = async (req, res, next) => {
  try {
    const page = await pageService.updatePage(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Page updated successfully',
      data: page,
    });
  } catch (error) {
    next(error);
  }
};

exports.savePageContent = async (req, res, next) => {
  try {
    const data = await pageService.savePageContent(req.params.id, req.body.sections);
    res.json({
      success: true,
      message: 'Page content saved successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserPages = async (req, res, next) => {
  try {
    const pages = await pageService.getUserPages();
    res.json({
      success: true,
      data: pages,
    });
  } catch (error) {
    next(error);
  }
};
