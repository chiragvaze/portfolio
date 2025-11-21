const express = require('express');
const router = express.Router();
const {
  getMessages,
  getMessage,
  createMessage,
  updateMessageStatus,
  replyToMessage,
  deleteMessage,
  getMessageStats
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getMessages)
  .post(createMessage);

router.get('/stats', protect, getMessageStats);

router.route('/:id')
  .get(protect, getMessage)
  .delete(protect, deleteMessage);

router.put('/:id/status', protect, updateMessageStatus);
router.put('/:id/reply', protect, replyToMessage);

module.exports = router;
