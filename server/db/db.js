const mongoose = require('mongoose');

async function connectToDb() {
  try {
    //   console.log('Connecting to MongoDB with URI:', 'mongodb://localhost:27017/ecommerce');
      await mongoose.connect('mongodb://localhost:27017/ecommerce', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
  } catch (err) {
      console.error('Failed to connect to MongoDB:', err.message);
  }
}

module.exports = connectToDb;
