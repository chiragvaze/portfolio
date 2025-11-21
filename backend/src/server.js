require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const projectRoutes = require('./routes/projectRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const certificationRoutes = require('./routes/certificationRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Initialize express
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet());

// CORS Configuration
const allowedOrigins = process.env.CLIENT_URL 
  ? process.env.CLIENT_URL.split(',').map(url => url.trim())
  : ['http://localhost:3000', 'http://localhost:8080'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/messages', messageRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
🚀 Server running in ${process.env.NODE_ENV} mode
📡 Listening on port ${PORT}
🌐 API: http://localhost:${PORT}/api
✅ Health check: http://localhost:${PORT}/api/health
  `);
});

module.exports = app;
