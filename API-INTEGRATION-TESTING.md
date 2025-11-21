# 🚀 Quick Start Guide - Testing API Integration

This guide will help you test the dynamic API integration with your static portfolio.

## Prerequisites

✅ Backend server running on http://localhost:5000
✅ MongoDB connected with seeded data
✅ API integration scripts added to public portfolio

## Testing Steps

### 1. Start Backend Server (if not running)

```powershell
cd C:\Users\DELL\OneDrive\Documents\GitDemo\portfolio\backend
node src/server.js
```

You should see:
```
✅ MongoDB connected to: ac-mmzqb6d-shard-00-01.gyiqutg.mongodb.net
🚀 Server running on port 5000
```

### 2. Open Public Portfolio

Open `public/index.html` in your browser:
- Option 1: Double-click the file
- Option 2: Use Live Server extension in VS Code
- Option 3: Run: `python -m http.server 8080` in the public folder

### 3. Check Browser Console

Open Developer Tools (F12) and check console:
- You should see: `🚀 Initializing dynamic portfolio...`
- Followed by: `✅ Portfolio data loaded successfully`

### 4. Verify Dynamic Content

Check that the following sections load from API:

**Profile Section**:
- Hero name, title, and description should match data from MongoDB
- About text should be loaded
- Contact info (email, phone) should be populated
- Social links (GitHub, LinkedIn) should work

**Projects Section**:
- Should display 3 projects from database
- Each project should have image, title, description
- Technologies should be listed
- GitHub and Live Demo links should work

**Experience Section**:
- Should display timeline items from database
- Work, education, and project experiences
- Dates and descriptions should be visible

**Certifications Section**:
- Should display certification cards from database
- Each cert should show title, description, platform
- Issue dates should be visible

**Contact Form**:
- Fill out the form and submit
- Should send message to backend API
- Check Messages page in admin dashboard to verify

### 5. Test API Endpoints Directly

Open these URLs in browser to verify API is working:

```
http://localhost:5000/api/health
http://localhost:5000/api/profile/public
http://localhost:5000/api/projects/public
http://localhost:5000/api/experience/public
http://localhost:5000/api/certifications/public
```

Each should return JSON data.

### 6. Verify Admin Dashboard Integration

1. Open admin dashboard: http://localhost:3000
2. Login with: admin@chiragvaze.com / admin123
3. Go to Projects page
4. Edit a project (change title or description)
5. Save changes
6. Refresh public portfolio
7. Verify changes appear on public portfolio

### 7. Test Contact Form

1. On public portfolio, scroll to Contact section
2. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Subject: Testing Contact Form
   - Message: This is a test message
3. Click Submit
4. Should see success alert
5. Check Messages in admin dashboard
6. Verify message appears

## Troubleshooting

### No Data Loads

**Check browser console for errors:**
- CORS error? → Check backend CORS configuration
- 404 error? → Verify backend is running on port 5000
- Network error? → Check if backend server is running

**Solution:**
```powershell
# Restart backend
cd backend
node src/server.js
```

### Data Still Hardcoded

**Possible causes:**
- Script not loaded → Check browser console for 404 errors
- Script order wrong → Verify config.js loads before api-integration.js
- Selectors don't match → Check if HTML element classes/IDs match script

**Solution:**
- Clear browser cache (Ctrl + Shift + Delete)
- Hard reload page (Ctrl + F5)

### Contact Form Fails

**Check:**
- Backend running? → http://localhost:5000/api/health
- CORS configured? → Check server logs
- Form fields correct? → Verify name attributes

**Test manually:**
```powershell
# Test POST request
curl -X POST http://localhost:5000/api/messages `
  -H "Content-Type: application/json" `
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello"}'
```

### Loading Indicator Stays

**Cause:** API request hanging or failed

**Solution:**
1. Open browser console
2. Check for errors
3. Verify API endpoints return data
4. Check network tab for failed requests

## Expected Results

After successful integration:

✅ **Hero Section**: Dynamic name, title, description from API
✅ **About Section**: Dynamic about text from API
✅ **Projects Section**: 3 projects loaded from database
✅ **Experience Section**: Timeline with work/education/projects
✅ **Certifications Section**: 6 certifications displayed
✅ **Contact Info**: Email and phone from database
✅ **Social Links**: GitHub and LinkedIn from database
✅ **Contact Form**: Submits to API, saves to database

## Next Steps

After confirming everything works:

1. ✅ Update content in admin dashboard
2. ✅ Add your own projects, experience, certifications
3. ✅ Upload project images via admin dashboard
4. ✅ Test all CRUD operations
5. 🚀 Ready for deployment!

## Sample Data

The database is seeded with:
- 1 admin user
- 3 sample projects
- 3 experience entries
- 6 certifications

You can modify all of this through the admin dashboard.

## API Endpoints Reference

### Public Endpoints (No Auth Required)
- `GET /api/health` - Server health check
- `GET /api/profile/public` - Get public profile
- `GET /api/projects/public` - Get all projects
- `GET /api/experience/public` - Get all experience
- `GET /api/certifications/public` - Get all certifications
- `POST /api/messages` - Submit contact form

### Protected Endpoints (Require JWT Token)
- `POST /api/auth/login` - Admin login
- `PUT /api/profile` - Update profile
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- And more...

## Performance Tips

**Caching:**
- API responses cached for 5 minutes in localStorage
- Reduces API calls on page refreshes
- Clear cache: `localStorage.clear()` in browser console

**Loading:**
- Blue progress bar shows when loading
- Sections populate in parallel for speed
- Cached data loads instantly

**Optimization:**
- Images served from Cloudinary
- Lazy loading for images
- Minify scripts for production

---

## Success Checklist

Before moving to deployment:

- [ ] Backend server runs without errors
- [ ] MongoDB connection successful
- [ ] All 3 projects display on portfolio
- [ ] Experience timeline populated
- [ ] Certifications show correctly
- [ ] Contact form sends messages
- [ ] Messages appear in admin dashboard
- [ ] Edit in admin reflects on portfolio
- [ ] No console errors in browser
- [ ] All links work correctly

If all checked, you're ready to deploy! 🎉

Refer to `DEPLOYMENT-GUIDE.md` for production deployment steps.
