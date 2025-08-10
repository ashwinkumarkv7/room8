const Room = require('../models/Room');
const User = require('../models/User');
const axios = require('axios'); // 1. Import axios

// @desc    Fetch all rooms, with optional filtering by roomType
// @route   GET /api/rooms
// @access  Public
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

// @desc    Fetch a single room by its SLUG
// @route   GET /api/rooms/:slug
// @access  Public
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

// @desc    Create a new room listing
// @route   POST /api/rooms
// @access  Private
const createRoom = async (req, res) => {
  try {
    const { title, area, city, price, imageUrls, features, roomType, description } = req.body;

    // --- 2. Geocoding Logic ---
    const fullAddress = `${area}, ${city}`;
    let coordinates = [];
    
    // This key is read from your server/.env file
    const GEOCODING_API_KEY = process.env.GOOGLE_MAPS_API_KEY; 
    
    const geoResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: fullAddress,
            key: GEOCODING_API_KEY,
        }
    });

    if (geoResponse.data.status === 'OK' && geoResponse.data.results.length > 0) {
        const { lat, lng } = geoResponse.data.results[0].geometry.location;
        coordinates = [lng, lat]; // MongoDB uses [longitude, latitude]
    } else {
        console.warn('Geocoding failed for address:', fullAddress, 'Status:', geoResponse.data.status);
    }

    const room = new Room({
      title,
      area,
      city,
      price,
      imageUrls,
      features,
      roomType,
      description,
      postedBy: req.user._id,
      // 3. Save the new location object to the database
      location: {
          address: fullAddress,
          coordinates: coordinates,
      }
    });

    const createdRoom = await room.save();
    res.status(201).json(createdRoom);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getRooms, getRoomBySlug, createRoom };
