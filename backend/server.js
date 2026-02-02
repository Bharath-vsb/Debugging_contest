/**
 * server.js
 * ─────────
 * Main entry point for the backend.
 * Initializes Express, connects to MongoDB, mounts routes.
 */

require('dotenv').config(); // load .env from project root or backend/

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');

// Route modules
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

/* ──────────────────────────────────────
   MIDDLEWARE
   ────────────────────────────────────── */
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

app.use(express.json());                    // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

/* ──────────────────────────────────────
   ROUTES
   ────────────────────────────────────── */
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);

/* ──────────────────────────────────────
   HEALTH CHECK
   ────────────────────────────────────── */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ──────────────────────────────────────
   404 CATCH-ALL
   ────────────────────────────────────── */
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
});

/* ──────────────────────────────────────
   GLOBAL ERROR HANDLER
   ────────────────────────────────────── */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

/* ──────────────────────────────────────
   START
   ────────────────────────────────────── */
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`   Admin panel: http://localhost:3000/admin`);
    console.log(`   Student portal: http://localhost:3000`);
  });
})();
