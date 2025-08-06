const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Set up multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route   POST /api/upload/profile-picture
// @desc    Upload a profile picture and update the user's profile
// @access  Private
router.post('/profile-picture', protect, upload.single('profilePic'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload the image to Cloudinary
    const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "room8_profile_pics" }, // Optional: organize uploads in a folder
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        uploadStream.end(req.file.buffer);
    });

    // Find the user and update their profilePic field
    const user = await User.findById(req.user._id);
    if (user) {
      user.profilePic = result.secure_url; // Save the secure URL from Cloudinary
      await user.save();
      
      // Send back the new URL
      res.json({
        message: 'Image uploaded successfully',
        profilePicUrl: result.secure_url,
      });
    } else {
        res.status(404).json({ message: 'User not found' });
    }

  } catch (error) { // <-- Added the missing curly braces here
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Server error during image upload' });
  }
});

module.exports = router;
