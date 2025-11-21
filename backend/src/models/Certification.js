const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Certification title is required']
  },
  description: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: [true, 'Platform is required']
  },
  icon: {
    type: String,
    default: 'fas fa-certificate'
  },
  issueDate: {
    type: String,
    default: ''
  },
  credentialUrl: {
    type: String,
    default: ''
  },
  credentialId: String,
  imageUrl: String,
  skills: [{
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
certificationSchema.index({ order: 1, createdAt: -1 });

module.exports = mongoose.model('Certification', certificationSchema);
