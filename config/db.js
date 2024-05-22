const mongoose = require('mongoose');
require('dotenv').config();

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {

    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);

  }
};

module.exports = connectDB;
