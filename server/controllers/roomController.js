const Room = require('../models/Room');
const User = require('../models/User');

const getRooms = async (req, res) => {
  try {
    const filter = {};
    if (req.query.roomType) {
      filter.roomType = req.query.roomType;
    }
    const rooms = await Room.find(filter).populate('postedBy', 'fullName profilePic');
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getRoomBySlug = async (req, res) => {
    try {
        const room = await Room.findOne({ slug: req.params.slug }).populate('postedBy', '-password');
        if (room) {
            res.json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        console.error('Error fetching room by slug:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createRoom = async (req, res) => {
  try {
    const { title, area, city, price, imageUrls, features, description } = req.body;

    const room = new Room({
      title,
      area,
      city,
      price,
      imageUrls,
      features,
      description,
      postedBy: req.user._id,
    });

    const createdRoom = await room.save();
    res.status(201).json(createdRoom);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getRooms, getRoomBySlug, createRoom };
