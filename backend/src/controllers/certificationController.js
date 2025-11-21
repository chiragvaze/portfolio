const Certification = require('../models/Certification');

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
const getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ order: 1, createdAt: -1 });
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single certification
// @route   GET /api/certifications/:id
// @access  Public
const getCertification = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    
    res.json(certification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create certification
// @route   POST /api/certifications
// @access  Private
const createCertification = async (req, res) => {
  try {
    const certification = await Certification.create(req.body);
    res.status(201).json(certification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update certification
// @route   PUT /api/certifications/:id
// @access  Private
const updateCertification = async (req, res) => {
  try {
    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    
    res.json(certification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete certification
// @route   DELETE /api/certifications/:id
// @access  Private
const deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    
    await certification.deleteOne();
    res.json({ message: 'Certification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCertifications,
  getCertification,
  createCertification,
  updateCertification,
  deleteCertification
};
