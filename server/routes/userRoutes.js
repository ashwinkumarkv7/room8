const express = require('express');
const {
  registerUser,
  loginUser,
  updateUserProfile,
  getUsers,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// --- Define Routes ---

// GET /api/users -> Fetches all users (for roommate browsing)
router.route('/').get(getUsers);

// POST /api/users/register -> Creates a new user
router.post('/register', registerUser);

// POST /api/users/login -> Authenticates a user
router.post('/login', loginUser);

// PUT /api/users/profile -> Updates the logged-in user's profile
router.route('/profile').put(protect, updateUserProfile);

module.exports = router;
