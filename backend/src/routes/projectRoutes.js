const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
  deleteProjectImage
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public route
router.get('/public', getProjects);

router.route('/')
  .get(protect, getProjects)
  .post(protect, createProject);

router.route('/:id')
  .get(getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

router.post('/:id/upload', protect, upload.single('image'), uploadProjectImage);
router.delete('/:id/images/:imageId', protect, deleteProjectImage);

module.exports = router;
