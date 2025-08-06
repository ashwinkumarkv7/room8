// --- Main Server Entry Point ---
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const roomRoutes = require('./routes/roomRoutes'); // <-- 1. Import room routes

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To accept JSON data in the body

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('Room8 API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/rooms', roomRoutes); // <-- 2. Use room routes


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
