// --- Main Server Entry Point ---
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const roomRoutes = require('./routes/roomRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const Message = require('./models/Message'); // 1. Import the Message model

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/conversations', conversationRoutes);

// --- Socket.IO Integration ---
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://room8-server.onrender.com"],
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('joinRoom', (conversationId) => {
    socket.join(conversationId);
    console.log(`User ${socket.id} joined room: ${conversationId}`);
  });

  // --- This is the updated sendMessage logic ---
  socket.on('sendMessage', async (data) => {
    try {
      // 2. Save the new message to the database
      const newMessage = new Message({
        conversationId: data.conversationId,
        sender: data.sender,
        text: data.text,
      });
      await newMessage.save();

      // 3. Broadcast the message to the other user in the room
      socket.to(data.conversationId).emit('receiveMessage', data);

    } catch (error) {
      console.error('Error saving message to DB:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server and Socket.IO running on port ${PORT}`));
