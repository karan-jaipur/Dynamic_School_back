require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router/Router');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', router);

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Malhotra Public School API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      pages: '/api/pages',
      sections: '/api/sections',
      banners: '/api/banners',
      navigation: '/api/nav',
      gallery: '/api/gallery',
      notices: '/api/notices',
      admissions: '/api/admissions',
      testimonials: '/api/testimonials',
      settings: '/api/settings',
      footer: '/api/footer'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
