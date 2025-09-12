const mongoose = require('mongoose');
const seed = require('./seed');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/whatsapp-chat-api';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    // Retry logic after delay
    setTimeout(connectDB, 5000);
  }
};

if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
  seed(MONGODB_URI).catch(console.error);
  console.log('Seeding temporal data completed');
}

module.exports = connectDB;
