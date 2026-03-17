# Quick Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- Cloudinary account (for image uploads)

## Step-by-Step Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup MongoDB
**Option A: Local MongoDB**
- Install MongoDB on your system
- Make sure MongoDB service is running

**Option B: MongoDB Atlas (Cloud)**
- Create account at mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Update MONGODB_URI in .env

### 3. Setup Cloudinary
- Create account at cloudinary.com
- Go to Dashboard
- Copy: Cloud Name, API Key, API Secret
- Paste in .env file

### 4. Create .env File
```bash
# Create .env from template (on Windows use copy command)
cp .env.example .env
```

Edit `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/malhotra_school
JWT_SECRET=your_super_secret_key_here_change_in_production
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

### 5. Seed Database (Optional but Recommended)
```bash
npm run seed
```

This creates:
- Admin user (email: admin@malhotrapublicschool.com, password: admin123)
- Sample notices
- Sample testimonials
- Navigation items
- Banners
- Default settings

### 6. Start the Server

**Development mode (auto-reload on changes):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start at: http://localhost:3000

### 7. Test the API

**Check health:**
```bash
curl http://localhost:3000/api/health
```

**Test login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@malhotrapublicschool.com\",\"password\":\"admin123\"}"
```

## Common Issues & Solutions

### "Cannot connect to MongoDB"
- Ensure MongoDB is running
- Check MONGODB_URI is correct
- For Atlas: Check IP whitelist and credentials

### "Cloudinary upload failed"
- Verify Cloudinary credentials
- Check internet connection
- Ensure API limits not exceeded

### "Port already in use"
- Change PORT in .env
- Or stop process using port 3000

### "Module not found"
- Run `npm install` again
- Delete node_modules and package-lock.json, then reinstall

## Next Steps

1. Connect your frontend application
2. Update CORS settings in .env
3. Change default admin password
4. Add more admin users if needed
5. Customize content through API

## Testing with Postman

Import these example requests:

**Login:**
- Method: POST
- URL: http://localhost:3000/api/auth/login
- Body (JSON): 
```json
{
  "email": "admin@malhotrapublicschool.com",
  "password": "admin123"
}
```

**Get Notices (Public):**
- Method: GET
- URL: http://localhost:3000/api/notices

**Create Notice (Protected):**
- Method: POST
- URL: http://localhost:3000/api/notices
- Headers: Authorization: Bearer [your_token]
- Body (JSON):
```json
{
  "title": "New Notice",
  "description": "Description here",
  "isHighlighted": true
}
```

## Production Deployment Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Set NODE_ENV=production
- [ ] Use MongoDB Atlas or production database
- [ ] Update FRONTEND_URL to production domain
- [ ] Enable HTTPS
- [ ] Set up environment variables on hosting platform
- [ ] Change admin password
- [ ] Test all endpoints
- [ ] Set up monitoring and logging

## Support

For issues or questions:
- Check README.md for detailed documentation
- Review API endpoint documentation
- Email: info@malhotrapublicschool.com

---
Happy Coding! 🚀
