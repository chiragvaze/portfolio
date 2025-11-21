const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required']
  },
  longDescription: {
    type: String,
    default: ''
  },
  images: [{
    url: String,
    publicId: String,
    type: {
      type: String,
      enum: ['screenshot', 'demo', 'thumbnail'],
      default: 'screenshot'
    }
  }],
  technologies: [{
    type: String,
    required: true
  }],
  features: [{
    type: String
  }],
  links: {
    live: String,
    github: String,
    demo: String
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'desktop', 'other'],
    default: 'web'
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  startDate: Date,
  endDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for sorting
projectSchema.index({ order: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
