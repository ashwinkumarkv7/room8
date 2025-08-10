const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// --- Register a new user ---
const registerUser = async (req, res) => {
  // Now accepts userRole from the frontend
  const { fullName, email, password, dob, userRole } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      dob,
      userRole, // Save the user's role
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        userRole: user.userRole, // Send the role back to the client
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
        userRole: user.userRole, // Also send role on login
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

// --- Update User Profile (Corrected Logic) ---
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // This logic checks if a field was included in the request and updates it.
      user.fullName = req.body.fullName ?? user.fullName;
      user.city = req.body.city ?? user.city;
      user.preferredLocation = req.body.preferredLocation ?? user.preferredLocation;
      user.profession = req.body.profession ?? user.profession;
      user.workplace = req.body.workplace ?? user.workplace;
      user.budget = req.body.budget ?? user.budget;
      user.roomType = req.body.roomType ?? user.roomType;
      user.moveInDate = req.body.moveInDate ?? user.moveInDate;
      user.hobbies = req.body.hobbies ?? user.hobbies;
      user.bio = req.body.bio ?? user.bio;
      user.cleanliness = req.body.cleanliness ?? user.cleanliness;
      user.socialHabits = req.body.socialHabits ?? user.socialHabits;
      user.sleepSchedule = req.body.sleepSchedule ?? user.sleepSchedule;
      user.smoking = req.body.smoking ?? user.smoking;
      user.drinking = req.body.drinking ?? user.drinking;
      user.pets = req.body.pets ?? user.pets;

      const updatedUser = await user.save();

      // Send back the complete, updated user object to refresh the context
      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        profilePic: updatedUser.profilePic,
        ...updatedUser._doc, 
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Server Error' });
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
