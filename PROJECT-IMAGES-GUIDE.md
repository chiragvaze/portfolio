# Project Images Guide

This guide will help you add real project screenshots and images to your portfolio.

## 📁 Folder Structure

Create the following folder structure in your project:

```
portfolio/
└── public/
    └── assets/
        └── projects/
            ├── task-manager/
            │   ├── screenshot.png
            │   └── demo.gif
            ├── weather-app/
            │   ├── screenshot.png
            │   └── demo.gif
            └── medical-website/
                ├── screenshot.png
                └── demo.gif
```

## 📸 Image Requirements

### Recommended Specifications:
- **Format**: PNG or WebP for screenshots, GIF for animations
- **Dimensions**: 1200x800px (3:2 aspect ratio)
- **File Size**: < 500KB for PNGs, < 2MB for GIFs
- **Quality**: High resolution, clear interface elements

### Screenshot Tips:
1. **Full Page Screenshots**: Use browser extensions like:
   - GoFullPage (Chrome)
   - Awesome Screenshot
   - Fireshot

2. **Clean Interface**: 
   - Hide personal data
   - Show main features
   - Use representative data

3. **Optimize Images**:
   - Use TinyPNG or Squoosh for compression
   - Convert to WebP for better performance

## 🎬 Creating Demo GIFs

### Tools:
- **ScreenToGif** (Windows) - Free, powerful
- **Kap** (Mac) - Simple, beautiful
- **LICEcap** (Cross-platform) - Lightweight

### GIF Best Practices:
- Duration: 5-10 seconds
- FPS: 15-20 for smooth playback
- Resolution: 800x600px or smaller
- File size: < 2MB (optimize with ezgif.com)

## 🔧 How to Add Images

### Step 1: Create Folders
```powershell
# Run in terminal at project root
New-Item -ItemType Directory -Path "public\assets\projects\task-manager"
New-Item -ItemType Directory -Path "public\assets\projects\weather-app"
New-Item -ItemType Directory -Path "public\assets\projects\medical-website"
```

### Step 2: Add Your Images
1. Take screenshots of your projects
2. Optionally create demo GIFs showing key features
3. Optimize images using TinyPNG or Squoosh
4. Save to respective folders

### Step 3: Update HTML
Replace placeholder images in `public/index.html`:

```html
<!-- Current (placeholder) -->
<img src="https://via.placeholder.com/600x400/0a0e27/00ff88?text=Task+Manager" alt="Task Manager" class="project-img">

<!-- Replace with your image -->
<img src="assets/projects/task-manager/screenshot.png" alt="Task Manager" class="project-img">

<!-- Or use GIF for animation -->
<img src="assets/projects/task-manager/demo.gif" alt="Task Manager Demo" class="project-img">
```

## 🎨 Alternative Image Sources

If you don't have project screenshots yet:

### 1. Mockups:
- **Figma**: Create project mockups
- **Canva**: Use templates
- **Mockuper**: Generate device mockups

### 2. Stock Images (Temporary):
- **Unsplash**: Free high-quality images
- **Pexels**: Tech-related photos
- **Pixabay**: Free stock photos

### 3. Code Screenshots:
- **Carbon**: Beautiful code screenshots (carbon.now.sh)
- **Ray.so**: Code snippets with gradient backgrounds
- **CodeImage**: Customizable code screenshots

## 🚀 Performance Optimization

### Before Publishing:
1. **Compress All Images**:
   ```powershell
   # Install ImageMagick (if not installed)
   # Then run:
   magick mogrify -resize 1200x800 -quality 85 public/assets/projects/*/*.png
   ```

2. **Convert to WebP**:
   ```html
   <picture>
       <source srcset="assets/projects/task-manager/screenshot.webp" type="image/webp">
       <img src="assets/projects/task-manager/screenshot.png" alt="Task Manager" class="project-img">
   </picture>
   ```

3. **Lazy Loading** (already implemented in portfolio):
   ```html
   <img src="..." alt="..." class="project-img" loading="lazy">
   ```

## ✅ Checklist

- [ ] Create `public/assets/projects/` folder structure
- [ ] Take screenshots of all 3 projects
- [ ] Optimize images (< 500KB each)
- [ ] Optional: Create demo GIFs
- [ ] Update HTML with actual image paths
- [ ] Test on slow connection
- [ ] Verify images load correctly
- [ ] Add alt text for accessibility

## 📝 Example: Complete Project Card

```html
<div class="project-card" data-aos="fade-up" data-tilt>
    <div class="project-image-wrapper">
        <picture>
            <source srcset="assets/projects/task-manager/screenshot.webp" type="image/webp">
            <img src="assets/projects/task-manager/screenshot.png" 
                 alt="Task Manager application interface showing task list and filters" 
                 class="project-img" 
                 loading="lazy">
        </picture>
    </div>
    <div class="project-info">
        <h3>Task Manager</h3>
        <p>Full-stack task management application with real-time updates</p>
        <div class="project-tech">
            <span>React</span>
            <span>Node.js</span>
            <span>MongoDB</span>
        </div>
        <div class="project-links">
            <a href="#" class="btn-link">Live Demo</a>
            <a href="#" class="btn-link">GitHub</a>
        </div>
    </div>
</div>
```

## 🎯 Quick Start

**Don't have images yet?** No problem! The placeholder images work great for now. Follow these steps when you're ready:

1. **Screenshot your projects** - Use Windows Snipping Tool or browser dev tools
2. **Drop them in** `public/assets/projects/[project-name]/`
3. **Update HTML** - Change image `src` attributes
4. **Done!** 🎉

---

**Need help?** Check out these resources:
- [How to Take Great Screenshots](https://www.google.com/search?q=how+to+take+website+screenshots)
- [Optimize Images for Web](https://tinypng.com/)
- [Create Demo GIFs](https://www.screentogif.com/)
