const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadProfileImage,
  uploadResume,
  addSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/profileController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public route
router.get('/public', getProfile);

router.route('/')
  .get(protect, getProfile)
  .put(protect, updateProfile);

router.post('/upload-image', protect, upload.single('image'), uploadProfileImage);
router.post('/resume', protect, upload.single('resume'), uploadResume);

router.route('/skills')
  .post(protect, addSkill);

router.route('/skills/:skillId')
  .put(protect, updateSkill)
  .delete(protect, deleteSkill);

module.exports = router;
