require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/database');
const chatRoutes = require('./routes/chatRoutes');
const errorHandler = require('./middleware/errorHandler');

const initSocket = require('./ws/socket');

const app = express();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());

// REST routes
app.use('/api/chat', chatRoutes);

// Error handler
app.use(errorHandler);

// Create HTTP server (so we can attach socket.io)
const server = http.createServer(app);

// Initialize WebSocket (Socket.IO)
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
