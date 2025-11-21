const express = require('express');
const router = express.Router();
const {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience
} = require('../controllers/experienceController');
const { protect } = require('../middleware/auth');

// Public route
router.get('/public', getExperiences);

router.route('/')
  .get(protect, getExperiences)
  .post(protect, createExperience);

router.route('/:id')
  .get(getExperience)
  .put(protect, updateExperience)
  .delete(protect, deleteExperience);

module.exports = router;
