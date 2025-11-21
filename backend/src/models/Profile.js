const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  // Hero Section
  name: {
    type: String,
    required: true,
    default: 'Chirag Vaze'
  },
  title: {
    type: String,
    required: true,
    default: 'IT Engineering Student & Web Developer'
  },
  heroDescription: {
    type: String,
    required: true
  },
  
  // About Section
  aboutText: {
    type: String,
    required: true
  },
  aboutImage: {
    type: String,
    default: ''
  },
  
  // Contact Information
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  
  // Social Links
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    instagram: String
  },
  
  // Resume
  resumeUrl: {
    type: String,
    default: ''
  },
  
  // Stats
  stats: {
    projectsCompleted: {
      type: Number,
      default: 10
    },
    technologies: {
      type: Number,
      default: 8
    },
    yearsLearning: {
      type: Number,
      default: 2
    }
  },
  
  // Skills
  skills: [{
    name: String,
    category: {
      type: String,
      enum: ['frontend', 'backend', 'tools', 'other'],
      default: 'other'
    },
    icon: String,
    proficiency: {
      type: Number,
      min: 0,
      max: 100
    }
  }],
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
