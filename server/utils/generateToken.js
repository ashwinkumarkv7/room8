const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // This function creates a secure token using your JWT_SECRET
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// This makes the function available to be imported by other files.
module.exports = generateToken;
