// --- User Controller Logic ---
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// --- Helper function to generate a JWT ---
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token will be valid for 30 days
  });
};


// --- 1. Register a new user ---
const registerUser = async (req, res) => {
  // Get all the data from the request body
  const {
    fullName, email, password, mobile, gender, dob,
    city, preferredLocation, profession, workplace, budget,
    roomType, moveInDate, hobbies, routine, smoking,
    drinking, food, pets, bio
  } = req.body;

  try {
    // Check if a user with this email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create a new user document in the database
    const user = await User.create({
        fullName, email, password, mobile, gender, dob,
        city, preferredLocation, profession, workplace, budget,
        roomType, moveInDate, hobbies, routine, smoking,
        drinking, food, pets, bio
    });

    // If the user was created successfully...
    if (user) {
      // ...send back the user's info and a token
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// --- 2. Login an existing user ---
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If user exists and the password matches...
        if (user && (await user.matchPassword(password))) {
            // ...send back their info and a new token
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = { registerUser, loginUser };
