const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  features: [{ type: String }],
  roomType: { type: String }, // 'private', 'shared', etc.
  description: { type: String, default: '' },
  
  // This is the crucial change. It now links to a User document.
  postedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
}, {
  timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
