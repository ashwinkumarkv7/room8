const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Configure multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @route   POST /api/upload/profile-picture
// @desc    Upload a single profile picture
// @access  Private
router.post('/profile-picture', protect, upload.single('profilePic'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "room8_profile_pics" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        uploadStream.end(req.file.buffer);
    });

    const user = await User.findById(req.user._id);
    if (user) {
      user.profilePic = result.secure_url;
      await user.save();
      
      res.json({
        message: 'Image uploaded successfully',
        profilePicUrl: result.secure_url,
      });
    } else {
        res.status(404).json({ message: 'User not found' });
    }

  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Server error during image upload' });
  }
});

// @route   POST /api/upload/room-images
// @desc    Upload multiple room images
// @access  Private
router.post('/room-images', protect, upload.array('roomImages', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadPromises = req.files.map(file => {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "room8_room_pics" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                }
            );
            uploadStream.end(file.buffer);
        });
    });

    const imageUrls = await Promise.all(uploadPromises);
    
    res.json({
      message: 'Images uploaded successfully',
      imageUrls: imageUrls,
    });

  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Server error during image upload' });
  }
});

module.exports = router;
