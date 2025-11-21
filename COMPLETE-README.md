# 🎨 Full-Stack Portfolio with Admin CMS

A **professional portfolio website** with a complete **Content Management System** built using the MERN Stack (MongoDB, Express, React, Node.js). Manage all portfolio content through an intuitive admin dashboard - no coding required!

---

## ✨ Features

### 🌟 Portfolio Website (Public)
- Responsive design with smooth animations
- Particle.js background effects
- Hero section with typewriter effect
- About section with profile image
- Projects showcase with filtering
- Experience & Education timeline
- Certifications grid display
- Contact form with email validation
- GitHub stats integration
- Back-to-top button
- Custom 404 page
- Resume download button
- SEO optimized

### 🎛️ Admin Dashboard (Private)
- **Secure Login** - JWT authentication
- **Dashboard** - Quick stats and activity feed
- **Projects Manager** - Add/Edit/Delete projects with image upload
- **Experience Manager** - Manage work/education timeline
- **Certifications Manager** - Add professional credentials
- **Messages Inbox** - View contact form submissions
- **Profile Editor** - Update personal information
- Responsive design with collapsible sidebar
- Real-time toast notifications

### 🔧 Backend API
- RESTful API with 30+ endpoints
- MongoDB database with Mongoose ODM
- JWT authentication & authorization
- Cloudinary integration for file uploads
- Input validation & error handling
- Security: Helmet, CORS, rate limiting
- Database seeding for quick setup

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (free)
- Cloudinary account (free)
- Git

### 1️⃣ Clone Repository
```bash
git clone <your-repo-url>
cd portfolio
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

Seed database with sample data:
```bash
npm run seed
```

Start backend:
```bash
npm start
```
✅ Backend running on `http://localhost:5000`

### 3️⃣ Admin Dashboard Setup
```bash
cd admin-dashboard
npm install
```

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start admin dashboard:
```bash
npm start
```
✅ Dashboard opens at `http://localhost:3000`

### 4️⃣ Login to Dashboard
- **Email**: admin@portfolio.com
- **Password**: admin123
- **⚠️ Change password after first login!**

---

## 📁 Project Structure

```
portfolio/
├── backend/                    # Express.js API
│   ├── src/
│   │   ├── config/            # Database & Cloudinary config
│   │   ├── models/            # Mongoose schemas (6 models)
│   │   ├── controllers/       # Business logic (6 controllers)
│   │   ├── routes/            # API endpoints (6 route files)
│   │   ├── middleware/        # Auth, upload, error handling
│   │   ├── server.js          # Express app entry
│   │   └── seedDatabase.js    # Database seeder
│   ├── .env.example           # Environment template
│   ├── package.json
│   └── README.md              # Backend documentation
│
├── admin-dashboard/            # React Admin UI
│   ├── public/
│   ├── src/
│   │   ├── components/        # Layout components
│   │   ├── pages/             # Dashboard pages (7 pages)
│   │   ├── context/           # Auth context
│   │   ├── services/          # API service layer
│   │   ├── App.js             # Main app with routing
│   │   └── index.js
│   ├── .env                   # API URL config
│   ├── package.json
│   └── tailwind.config.js
│
├── public/                     # Static Portfolio
│   ├── index.html             # Main portfolio page
│   ├── script.js              # Interactive features
│   ├── css/
│   │   ├── styles.css         # Main styles
│   │   └── variables.css      # CSS custom properties
│   └── 404.html               # Custom 404 page
│
├── ADMIN-SETUP-GUIDE.md        # Complete setup instructions
├── DASHBOARD-USER-GUIDE.md     # Dashboard usage guide
├── FEATURES-SUMMARY.md         # All features documented
├── PROJECT-IMAGES-GUIDE.md     # Image management guide
└── README.md                   # This file
```

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js v16+
- **Framework**: Express.js 4.18
- **Database**: MongoDB with Mongoose 8.0
- **Authentication**: JWT + bcryptjs
- **File Upload**: Multer + Cloudinary
- **Security**: Helmet, CORS, express-rate-limit
- **Validation**: express-validator

### Admin Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **State**: Context API

### Static Portfolio
- **HTML5** + **CSS3** + **JavaScript ES6**
- **Animations**: AOS (Animate On Scroll)
- **Effects**: Particles.js
- **Icons**: Font Awesome 6

---

## 📚 API Documentation

### Public Endpoints (No Auth)
```
GET  /api/profile/public        - Get profile data
GET  /api/projects/public       - Get all projects
GET  /api/experience/public     - Get experience timeline
GET  /api/certifications/public - Get all certifications
POST /api/messages              - Submit contact form
```

### Protected Endpoints (Auth Required)
```
POST /api/auth/login                  - Admin login
POST /api/auth/change-password        - Change password

GET    /api/profile                   - Get profile
PUT    /api/profile                   - Update profile
POST   /api/profile/skills            - Add skill
DELETE /api/profile/skills/:skill     - Remove skill

GET    /api/projects                  - Get all projects
POST   /api/projects                  - Create project
PUT    /api/projects/:id              - Update project
DELETE /api/projects/:id              - Delete project
POST   /api/projects/:id/image        - Upload project image

GET    /api/experience                - Get all experience
POST   /api/experience                - Create experience
PUT    /api/experience/:id            - Update experience
DELETE /api/experience/:id            - Delete experience

GET    /api/certifications            - Get all certifications
POST   /api/certifications            - Create certification
PUT    /api/certifications/:id        - Update certification
DELETE /api/certifications/:id        - Delete certification

GET    /api/messages                  - Get all messages
GET    /api/messages/stats            - Get message stats
PUT    /api/messages/:id/status       - Update message status
PUT    /api/messages/:id/reply        - Reply to message
DELETE /api/messages/:id              - Delete message
```

**Authentication:** Include JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs with salt rounds
- **CORS Protection** - Configured allowed origins
- **Rate Limiting** - 100 requests per 15 minutes
- **Helmet.js** - HTTP security headers
- **Input Validation** - express-validator on all inputs
- **Environment Variables** - Sensitive data in .env
- **Protected Routes** - Middleware authentication

---

## 📱 Admin Dashboard Pages

1. **Dashboard** (`/`) - Overview with stats and quick actions
2. **Projects** (`/projects`) - Manage portfolio projects
3. **Experience** (`/experience`) - Work & education timeline
4. **Certifications** (`/certifications`) - Professional credentials
5. **Messages** (`/messages`) - Contact form inbox
6. **Profile** (`/profile`) - Personal information editor
7. **Login** (`/login`) - Authentication page

---

## 🎯 Usage Workflow

### Adding a New Project
1. Login to admin dashboard
2. Navigate to **Projects** page
3. Click **"Add Project"** button
4. Fill in project details:
   - Title (required)
   - Description (required)
   - Technologies (comma-separated)
   - Category (Web App/Mobile/ML/Other)
   - Status (In Progress/Completed)
   - Links (GitHub, Live Demo)
5. Click **"Save Project"**
6. Project appears immediately in admin and public portfolio

### Managing Contact Messages
1. Navigate to **Messages** page
2. View inbox (left panel)
3. Click message to read (right panel)
4. Mark as read or delete
5. Unread messages have blue indicator

### Updating Profile
1. Navigate to **Profile** page
2. Edit any field (name, title, bio, etc.)
3. Update social links (GitHub, LinkedIn)
4. Click **"Save Changes"**
5. Changes reflect on public portfolio

---

## 🌐 Making Portfolio Dynamic

Currently, `public/index.html` has **hardcoded** content. To connect it to the API:

### Option 1: Add JavaScript Fetch (Simple)
Add to `public/script.js`:

```javascript
async function loadPortfolio() {
  // Fetch profile
  const profile = await fetch('http://localhost:5000/api/profile/public').then(r => r.json());
  document.querySelector('.hero-name').textContent = profile.name;
  document.querySelector('.hero-title').textContent = profile.title;

  // Fetch projects
  const projects = await fetch('http://localhost:5000/api/projects/public').then(r => r.json());
  const projectsContainer = document.querySelector('.projects-grid');
  projectsContainer.innerHTML = projects.map(p => `
    <div class="project-card" data-aos="fade-up">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="tech-stack">${p.technologies.join(', ')}</div>
      ${p.liveLink ? `<a href="${p.liveLink}" target="_blank">View Project</a>` : ''}
    </div>
  `).join('');
}

window.addEventListener('load', loadPortfolio);
```

### Option 2: Convert to React (Recommended)
- Move static portfolio to React
- Reuse API service from admin dashboard
- Better state management and routing

---

## 🚀 Deployment Guide

### Backend → Render.com (Free)
1. Create Render account
2. New Web Service → Connect GitHub repo
3. Select `backend` directory
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables (MongoDB URI, JWT secret, Cloudinary)
7. Deploy and copy URL

### Admin Dashboard → Vercel (Free)
1. Create Vercel account
2. Import GitHub repo → Select `admin-dashboard` directory
3. Build command: `npm run build`
4. Output directory: `build`
5. Add environment variable: `REACT_APP_API_URL=<backend-url>`
6. Deploy and copy URL

### Static Portfolio → GitHub Pages/Netlify
1. Build static site (if React) or use `public/` folder
2. Update API URLs to production backend
3. Deploy to GitHub Pages or Netlify

---

## 🐛 Troubleshooting

### Backend won't start
- ✅ Check MongoDB connection string in `.env`
- ✅ Verify Node.js version (v16+)
- ✅ Run `npm install` to ensure dependencies

### Dashboard shows "Network Error"
- ✅ Ensure backend is running on port 5000
- ✅ Check `REACT_APP_API_URL` in `admin-dashboard/.env`
- ✅ Verify CORS is enabled in backend

### Can't login
- ✅ Run database seeder: `cd backend && npm run seed`
- ✅ Use default credentials: admin@portfolio.com / admin123
- ✅ Check MongoDB Atlas network access (whitelist IP)

### Images not uploading
- ✅ Verify Cloudinary credentials in backend `.env`
- ✅ Check file size (max 10MB)
- ✅ Ensure multer middleware is configured

---

## 📖 Documentation Files

- **ADMIN-SETUP-GUIDE.md** - Step-by-step setup instructions
- **DASHBOARD-USER-GUIDE.md** - How to use admin dashboard
- **FEATURES-SUMMARY.md** - All 12 static features documented
- **PROJECT-IMAGES-GUIDE.md** - Image management guide
- **backend/README.md** - Backend API documentation

---

## 🎓 Future Enhancements

- [ ] Email notifications for new messages
- [ ] Blog/Articles section with CMS
- [ ] SEO optimization and meta tags
- [ ] Analytics dashboard (visitor stats)
- [ ] Multi-user support with roles
- [ ] Password reset via email
- [ ] Activity logs and audit trail
- [ ] Image gallery manager
- [ ] Dark mode toggle
- [ ] Export portfolio data (JSON/PDF)

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- **Particles.js** - Background effects
- **AOS** - Scroll animations
- **Font Awesome** - Icons
- **Tailwind CSS** - Utility-first styling
- **MongoDB Atlas** - Database hosting
- **Cloudinary** - Image hosting

---

## 📞 Support

**Documentation:**
- Technical Setup: `ADMIN-SETUP-GUIDE.md`
- User Guide: `DASHBOARD-USER-GUIDE.md`
- API Docs: `backend/README.md`

**Quick Links:**
- Backend API: `http://localhost:5000`
- Admin Dashboard: `http://localhost:3000`
- Static Portfolio: `public/index.html`

---

**Built with ❤️ using MERN Stack**

*Happy Coding! 🚀*
