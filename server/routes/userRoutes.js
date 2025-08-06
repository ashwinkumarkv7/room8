// --- User API Routes ---
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);


module.exports = router;
