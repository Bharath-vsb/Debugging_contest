/**
 * database.js
 * ───────────
 * Establishes a Mongoose connection to MongoDB.
 * Logs connection events for operational visibility.
 */

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/debugcontest';

async function connectDB() {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser:    true,
      useUnifiedTopology: true
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // exit if DB is unreachable
  }
}

// Log disconnection warnings
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected. Attempting reconnection...');
});

module.exports = { connectDB };
