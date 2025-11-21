# Portfolio Backend API

Complete REST API for the Portfolio CMS built with MERN stack.

## 🚀 Features

- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose
- ✅ JWT authentication
- ✅ File uploads with Cloudinary
- ✅ Input validation
- ✅ Error handling
- ✅ Rate limiting
- ✅ CORS configured
- ✅ Security with Helmet

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (free tier)
- Cloudinary account (free tier)

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create Environment File

Copy `.env.example` to `.env`:

```bash
copy .env.example .env
```

### 3. Configure Environment Variables

Edit `.env` and add your credentials:

```env
# MongoDB Atlas
MONGODB_URI=your-mongodb-connection-string

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-key-here

# Cloudinary (from your Cloudinary dashboard)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin Credentials
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
```

### 4. Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with `portfolio`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 5. Get Cloudinary Credentials

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free account
3. Go to Dashboard
4. Copy: Cloud Name, API Key, API Secret
5. Paste them in `.env`

### 6. Seed the Database

Populate the database with initial data:

```bash
npm run seed
```

This will create:
- Admin user
- Sample profile
- 3 sample projects
- 3 experience items
- 6 certifications

**Note the admin credentials shown after seeding!**

### 7. Start the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will start on: `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/password` - Change password (Protected)

### Profile
- `GET /api/profile` - Get profile (Public)
- `PUT /api/profile` - Update profile (Protected)
- `POST /api/profile/upload-image` - Upload profile image (Protected)
- `POST /api/profile/skills` - Add skill (Protected)
- `PUT /api/profile/skills/:skillId` - Update skill (Protected)
- `DELETE /api/profile/skills/:skillId` - Delete skill (Protected)

### Projects
- `GET /api/projects` - Get all projects (Public)
- `GET /api/projects/:id` - Get single project (Public)
- `POST /api/projects` - Create project (Protected)
- `PUT /api/projects/:id` - Update project (Protected)
- `DELETE /api/projects/:id` - Delete project (Protected)
- `POST /api/projects/:id/upload` - Upload project image (Protected)
- `DELETE /api/projects/:id/images/:imageId` - Delete project image (Protected)

### Experience
- `GET /api/experience` - Get all experiences (Public)
- `GET /api/experience/:id` - Get single experience (Public)
- `POST /api/experience` - Create experience (Protected)
- `PUT /api/experience/:id` - Update experience (Protected)
- `DELETE /api/experience/:id` - Delete experience (Protected)

### Certifications
- `GET /api/certifications` - Get all certifications (Public)
- `GET /api/certifications/:id` - Get single certification (Public)
- `POST /api/certifications` - Create certification (Protected)
- `PUT /api/certifications/:id` - Update certification (Protected)
- `DELETE /api/certifications/:id` - Delete certification (Protected)

### Messages
- `GET /api/messages` - Get all messages (Protected)
- `GET /api/messages/stats` - Get message statistics (Protected)
- `GET /api/messages/:id` - Get single message (Protected)
- `POST /api/messages` - Create message (Public - Contact form)
- `PUT /api/messages/:id/status` - Update message status (Protected)
- `PUT /api/messages/:id/reply` - Reply to message (Protected)
- `DELETE /api/messages/:id` - Delete message (Protected)

## 🔒 Authentication

Protected routes require JWT token in header:

```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN'
}
```

## 🧪 Testing the API

### Using Thunder Client / Postman

1. **Login**:
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@chiragvaze.com",
  "password": "admin123"
}
```

2. **Copy the token from response**

3. **Get Projects** (no auth needed):
```http
GET http://localhost:5000/api/projects
```

4. **Create Project** (needs auth):
```http
POST http://localhost:5000/api/projects
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "New Project",
  "description": "Project description",
  "technologies": ["React", "Node.js"],
  "category": "web"
}
```

## 📂 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js      # MongoDB connection
│   │   └── cloudinary.js    # Cloudinary config
│   ├── controllers/         # Request handlers
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   ├── projectController.js
│   │   ├── experienceController.js
│   │   ├── certificationController.js
│   │   └── messageController.js
│   ├── middleware/          # Custom middleware
│   │   ├── auth.js         # JWT verification
│   │   ├── upload.js       # File upload
│   │   └── errorHandler.js
│   ├── models/             # MongoDB schemas
│   │   ├── User.js
│   │   ├── Profile.js
│   │   ├── Project.js
│   │   ├── Experience.js
│   │   ├── Certification.js
│   │   └── Message.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── experienceRoutes.js
│   │   ├── certificationRoutes.js
│   │   └── messageRoutes.js
│   ├── server.js           # Express app
│   └── seedDatabase.js     # Database seeder
├── .env                    # Environment variables
├── .env.example           # Example env file
├── .gitignore
├── package.json
└── README.md
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check your internet connection
- Verify MongoDB URI is correct
- Ensure your IP is whitelisted in MongoDB Atlas
- Check database user has correct permissions

### Cloudinary Upload Error
- Verify credentials in `.env`
- Check file size (max 5MB)
- Ensure file type is supported

### JWT Error
- Check JWT_SECRET in `.env`
- Verify token is valid and not expired
- Ensure Authorization header format: `Bearer TOKEN`

## 📚 Learn More

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB/Mongoose](https://mongoosejs.com/)
- [JWT Authentication](https://jwt.io/)
- [Cloudinary](https://cloudinary.com/documentation)

## 🚀 Next Steps

1. ✅ Backend API is ready
2. ⏭️ Build React Admin Dashboard
3. ⏭️ Connect Public Portfolio to API
4. ⏭️ Deploy to Render/Railway

---

**Backend Complete!** 🎉

Now you can build the admin dashboard to manage your portfolio!
