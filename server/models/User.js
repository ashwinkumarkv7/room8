// --- User Data Schema ---
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Info
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String },
  gender: { type: String },
  dob: { type: Date },

  // Profile Details
  city: { type: String },
  preferredLocation: { type: String },
  profession: { type: String },
  workplace: { type: String },
  budget: { type: Number },
  roomType: { type: String },
  moveInDate: { type: Date },
  hobbies: [{ type: String }],
  routine: { type: String },
  smoking: { type: String },
  drinking: { type: String },
  food: { type: String },
  pets: { type: String },
  bio: { type: String },
  profilePic: { type: String, default: 'default_avatar_url' }, // Store URL of the image
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// --- Password Hashing Middleware ---
// This will run before a user document is saved
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// --- Method to compare entered password with hashed password ---
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = User;
