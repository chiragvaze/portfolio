const Message = require('../models/Message');

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
const getMessages = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = {};
    if (status) query.status = status;
    
    const messages = await Message.find(query).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single message
// @route   GET /api/messages/:id
// @access  Private
const getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create message (contact form submission)
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
  try {
    const messageData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    };
    
    const message = await Message.create(messageData);
    res.status(201).json({ 
      message: 'Message sent successfully',
      data: message
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update message status
// @route   PUT /api/messages/:id/status
// @access  Private
const updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reply to message
// @route   PUT /api/messages/:id/reply
// @access  Private
const replyToMessage = async (req, res) => {
  try {
    const { replyText } = req.body;
    
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      {
        replied: true,
        replyText,
        repliedAt: Date.now(),
        status: 'replied'
      },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    await message.deleteOne();
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get message stats
// @route   GET /api/messages/stats
// @access  Private
const getMessageStats = async (req, res) => {
  try {
    const total = await Message.countDocuments();
    const unread = await Message.countDocuments({ status: 'unread' });
    const read = await Message.countDocuments({ status: 'read' });
    const replied = await Message.countDocuments({ status: 'replied' });
    
    res.json({
      total,
      unread,
      read,
      replied
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMessages,
  getMessage,
  createMessage,
  updateMessageStatus,
  replyToMessage,
  deleteMessage,
  getMessageStats
};
