const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['work', 'education', 'project', 'other'],
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  organization: {
    type: String,
    required: [true, 'Organization is required']
  },
  location: String,
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    default: 'Present'
  },
  current: {
    type: Boolean,
    default: false
  },
  technologies: [{
    type: String
  }],
  achievements: [{
    type: String
  }],
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for sorting
experienceSchema.index({ order: 1, startDate: -1 });

module.exports = mongoose.model('Experience', experienceSchema);
