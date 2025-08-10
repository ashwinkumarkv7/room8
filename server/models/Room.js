const mongoose = require('mongoose');

const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  area: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrls: [{ type: String }],
  features: [{ type: String }],
  description: { type: String, default: '' },
  postedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  // The roomType and location fields have been removed
}, {
  timestamps: true,
});

roomSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title);
  }
  next();
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
