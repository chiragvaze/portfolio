const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied', 'archived'],
    default: 'unread'
  },
  ipAddress: String,
  userAgent: String,
  replied: {
    type: Boolean,
    default: false
  },
  replyText: String,
  repliedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for filtering and sorting
messageSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
