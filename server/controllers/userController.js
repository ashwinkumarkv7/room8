const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// --- Register a new user ---
const registerUser = async (req, res) => {
  const { fullName, email, password, dob } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ fullName, email, password, dob });
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// --- Login an existing user ---
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// --- Update User Profile ---
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.fullName = req.body.fullName || user.fullName;
    user.city = req.body.city || user.city;
    // ... update other fields
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// --- Fetch all users (roommates) ---
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerUser, loginUser, updateUserProfile, getUsers };
