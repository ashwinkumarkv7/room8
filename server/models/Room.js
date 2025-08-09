const mongoose = require('mongoose');

// A simple function to create a URL-friendly slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true }, // The new slug field
  area: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  // Changed from imageUrl to imageUrls to store an array of strings
  imageUrls: [{ type: String }],
  features: [{ type: String }],
  roomType: { type: String },
  description: { type: String, default: '' },
  postedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
}, {
  timestamps: true,
});

// This function runs before a document is saved to automatically create the slug
roomSchema.pre('save', function(next) {
  // only update the slug if the title was changed
  if (this.isModified('title')) {
    this.slug = slugify(this.title);
  }
  next();
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
