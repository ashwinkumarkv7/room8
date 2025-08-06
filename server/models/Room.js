const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  features: [{ type: String }],
  roomType: { type: String },
  furnishing: { type: String },
  petFriendly: { type: Boolean },
  internet: { type: Boolean },
  verified: { type: Boolean },
  postedBy: {
    name: { type: String },
    imageUrl: { type: String },
    rating: { type: Number },
  },
}, {
  timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
