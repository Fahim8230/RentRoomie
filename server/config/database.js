require('dotenv').config();
const mongoose = require('mongoose');

const connection = process.env.MONG_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(connection);
    console.log('MongoDB connection successful');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;