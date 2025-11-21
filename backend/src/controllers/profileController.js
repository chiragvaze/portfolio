const Profile = require('../models/Profile');
const cloudinary = require('../config/cloudinary');

// @desc    Get profile
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    
    if (!profile) {
      // Create default profile if none exists
      profile = await Profile.create({
        name: 'Chirag Vaze',
        title: 'IT Engineering Student & Web Developer',
        heroDescription: 'Passionate about creating innovative web solutions',
        aboutText: 'About me content here',
        email: 'chirag@example.com'
      });
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      Object.assign(profile, req.body);
      await profile.save();
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload profile image
// @route   POST /api/profile/upload-image
// @access  Private
const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'portfolio/profile' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    res.json({
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add skill
// @route   POST /api/profile/skills
// @access  Private
const addSkill = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    
    profile.skills.push(req.body);
    await profile.save();
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update skill
// @route   PUT /api/profile/skills/:skillId
// @access  Private
const updateSkill = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    
    const skill = profile.skills.id(req.params.skillId);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    Object.assign(skill, req.body);
    await profile.save();
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete skill
// @route   DELETE /api/profile/skills/:skillId
// @access  Private
const deleteSkill = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    
    profile.skills.pull(req.params.skillId);
    await profile.save();
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadProfileImage,
  addSkill,
  updateSkill,
  deleteSkill
};
