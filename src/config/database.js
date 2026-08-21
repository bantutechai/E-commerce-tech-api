const mongoose = require('mongoose');
const env = require('./env');

const connectDatabase = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('[SUCCESS] Mongoose default connection open to Database');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`[WARNING] Mongoose default connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('[WARNING] Mongoose default connection disconnected');
    });

    await mongoose.connect(env.MONGODB_URI, {
      autoIndex: env.NODE_ENV === 'development',
    });
  } catch (error) {
    console.error('[ERROR] Could not connect to MongoDB:', error.message);
    throw error;
  }
};

module.exports = { connectDatabase };

