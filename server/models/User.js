const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Info
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: String },

  // Profile Details from Onboarding
  city: { type: String, default: '' },
  preferredLocation: { type: String, default: '' },
  profession: { type: String, default: '' },
  workplace: { type: String, default: '' },
  budget: { type: Number, default: 0 },
  roomType: { type: String, default: 'private' },
  moveInDate: { type: Date, default: null },
  hobbies: { type: [String], default: [] },
  bio: { type: String, default: '' },
  profilePic: { type: String, default: 'default_avatar_url' },

  // Detailed Lifestyle Fields from Onboarding
  cleanliness: { type: String, default: 'average' },
  socialHabits: { type: String, default: 'occasionally' },
  sleepSchedule: { type: String, default: 'early_bird' },
  smoking: { type: String, default: 'no' },
  drinking: { type: String, default: 'no' },
  pets: { type: String, default: 'no' },

}, {
  timestamps: true,
});

// --- Password Hashing Middleware ---
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
