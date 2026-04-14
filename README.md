# Malhotra Public School - Backend API

Production-ready Node.js + Express + MongoDB backend for a dynamic school website and CMS system.

## 🚀 Features

- **JWT Authentication** - Secure admin login system
- **Dynamic Page Builder** - Create and manage pages with customizable sections
- **Image Management** - Cloudinary integration for image uploads
- **Content Management** - Manage banners, notices, testimonials, gallery, and more
- **Admission System** - Handle online admission applications
- **RESTful API** - Clean and well-documented API endpoints
- **MVC Architecture** - Organized and scalable code structure

## 📋 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Image Storage:** Cloudinary
- **Password Hashing:** bcryptjs
- **File Upload:** Multer

## 📁 Project Structure

```
school_site/
├── config/
│   ├── db.js              # MongoDB connection
│   └── cloudinary.js      # Cloudinary configuration
├── controller/            # Business logic
│   ├── authController.js
│   ├── pageController.js
│   ├── sectionController.js
│   ├── bannerController.js
│   ├── navController.js
│   ├── galleryController.js
│   ├── noticeController.js
│   ├── admissionController.js
│   ├── testimonialController.js
│   ├── settingsController.js
│   └── footerController.js
├── model/                 # Database schemas
│   ├── User.js
│   ├── Page.js
│   ├── Section.js
│   ├── Banner.js
│   ├── NavItem.js
│   ├── Gallery.js
│   ├── Notice.js
│   ├── Admission.js
│   ├── Testimonial.js
│   ├── Settings.js
│   └── Footer.js
├── middleware/
│   ├── auth.js           # JWT verification
│   └── upload.js         # File upload handling
├── router/               # API routes
│   ├── Router.js         # Main router
│   └── [route files]
├── scripts/
│   └── seed.js          # Database seeder
├── .env.example         # Environment variables template
├── .gitignore
├── index.js            # Application entry point
└── package.json

```

## ⚙️ Installation & Setup

### 1. Clone or navigate to the project directory

```bash
cd school_site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```bash
# Copy from example
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/malhotra_school
# Or use MongoDB Atlas connection string

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3001
```

### 4. Seed the database (optional but recommended)

Populate the database with demo data including admin user:

```bash
npm run seed
```

**Default Admin Credentials:**
- Email: `admin@malhotrapublicschool.com`
- Password: `admin123`

### 5. Start the server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new admin
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token

### Pages
- `POST /api/pages` - Create page (Protected)
- `GET /api/pages` - Get all pages
- `GET /api/pages/:slug` - Get page by slug with sections
- `PUT /api/pages/:id` - Update page (Protected)
- `DELETE /api/pages/:id` - Delete page (Protected)

### Sections
- `POST /api/sections` - Create section (Protected)
- `GET /api/sections/page/:pageId` - Get sections by page
- `PUT /api/sections/:id` - Update section (Protected)
- `DELETE /api/sections/:id` - Delete section (Protected)
- `POST /api/sections/reorder` - Reorder sections (Protected)

### Banners
- `POST /api/banners` - Create banner with image (Protected)
- `GET /api/banners` - Get all banners
- `PUT /api/banners/:id` - Update banner (Protected)
- `DELETE /api/banners/:id` - Delete banner (Protected)
- `POST /api/banners/reorder` - Reorder banners (Protected)

### Navigation
- `POST /api/nav` - Create nav item (Protected)
- `GET /api/nav` - Get all nav items
- `PUT /api/nav/:id` - Update nav item (Protected)
- `DELETE /api/nav/:id` - Delete nav item (Protected)
- `POST /api/nav/reorder` - Reorder nav items (Protected)

### Gallery
- `POST /api/gallery` - Create gallery with images (Protected)
- `GET /api/gallery` - Get all galleries
- `GET /api/gallery/categories` - Get categories
- `GET /api/gallery/category/:category` - Get by category
- `PUT /api/gallery/:id` - Update gallery (Protected)
- `DELETE /api/gallery/:id` - Delete gallery (Protected)

### Notices
- `POST /api/notices` - Create notice (Protected)
- `GET /api/notices` - Get all notices
- `GET /api/notices/highlighted` - Get highlighted notices
- `PUT /api/notices/:id` - Update notice (Protected)
- `DELETE /api/notices/:id` - Delete notice (Protected)

### Admissions
- `POST /api/admissions` - Submit application (Public)
- `GET /api/admissions` - Get all applications (Protected)
- `PUT /api/admissions/:id/status` - Update status (Protected)
- `DELETE /api/admissions/:id` - Delete application (Protected)
- `GET /api/admissions/export` - Export data (Protected)

### Testimonials
- `POST /api/testimonials` - Create testimonial (Protected)
- `GET /api/testimonials` - Get all testimonials
- `PUT /api/testimonials/:id` - Update testimonial (Protected)
- `DELETE /api/testimonials/:id` - Delete testimonial (Protected)

### Settings
- `GET /api/settings` - Get global settings
- `PUT /api/settings` - Update settings (Protected)

### Footer
- `GET /api/footer` - Get footer content
- `PUT /api/footer` - Update footer (Protected)

## 🔐 Authentication

Protected routes require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

## 📤 File Uploads

Image uploads are handled via multipart/form-data:
- Single image: `image` field
- Multiple images: `images` field (max 10)

## 🌐 CORS Configuration

CORS is enabled for the frontend URL specified in `.env`. Update `FRONTEND_URL` to match your frontend application.

## 🛠️ Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with demo data

### Database Models

All models use Mongoose schemas with proper validation:
- User (authentication)
- Page (dynamic pages)
- Section (page sections)
- Banner (homepage sliders)
- NavItem (navigation menu)
- Gallery (image galleries)
- Notice (announcements)
- Admission (applications)
- Testimonial (reviews)
- Settings (singleton - global settings)
- Footer (singleton - footer content)

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production` in `.env`
2. Update `MONGODB_URI` to production database
3. Set strong `JWT_SECRET`
4. Configure Cloudinary credentials
5. Update `FRONTEND_URL`

### Recommended Platforms
- **Backend:** Render, Railway, Heroku, AWS, DigitalOcean
- **Database:** MongoDB Atlas
- **Images:** Cloudinary

## 📝 License

ISC

## 👨‍💻 Support

For support, email: info@malhotrapublicschool.com

---

**Made with ❤️ for Malhotra Public School, Kotputli, Rajasthan**
