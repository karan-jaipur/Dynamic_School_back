const express = require('express');
const router = express.Router();

// Import all route modules
const authRoutes = require('./authRoutes');
const pageRoutes = require('./pageRoutes');
const sectionRoutes = require('./sectionRoutes');
const bannerRoutes = require('./bannerRoutes');
const navRoutes = require('./navRoutes');
const galleryRoutes = require('./galleryRoutes');
const noticeRoutes = require('./noticeRoutes');
const admissionRoutes = require('./admissionRoutes');
const testimonialRoutes = require('./testimonialRoutes');
const settingsRoutes = require('./settingsRoutes');
const footerRoutes = require('./footerRoutes');
const mediaLibraryRoutes = require('./mediaLibraryRoutes');
const AcademicRoute = require('./AcademicProg');
const StatisticRoute = require('./StatisticsRoute')
const contentRoutes = require('./contentRoutes');

// Mount routes
router.use('/content', contentRoutes);
router.use('/auth', authRoutes);
router.use('/pages', pageRoutes);
router.use('/sections', sectionRoutes);
router.use('/banners', bannerRoutes);
router.use('/nav', navRoutes);
router.use('/gallery', galleryRoutes);
router.use('/notices', noticeRoutes);
router.use('/admissions', admissionRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/settings', settingsRoutes);
router.use('/footer', footerRoutes);
router.use('/media-library', mediaLibraryRoutes);
router.use('/AcademicProg',AcademicRoute)
router.use('/Statistic',StatisticRoute)

// Health check route
// router.get('/health', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'API is running',
//     timestamp: new Date().toISOString()
//   });
// });

// module.exports = router;

// const allpractice=require('../controller/practice')
// const Router=express.Router()



// Router.get('/manish',allpractice)

module.exports=router
