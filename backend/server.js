/**
 * server.js
 * ─────────
 * Main entry point for the backend.
 * Initializes Express, connects to MongoDB, mounts routes.
 * 
 * OPTIMIZED FOR LOCAL NETWORK DEPLOYMENT:
 *   - Binds to 0.0.0.0 to accept connections from any device on local network
 *   - Rate limiting to prevent abuse
 *   - Request monitoring and logging
 *   - Connection pooling for high concurrency
 */

require('dotenv').config(); // load .env from project root or backend/

const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/database');

// Route modules
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Middleware
const { trackConnection, requestLogger, getStats } = require('./middleware/monitoring');
const { generalLimiter } = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 5000;

/* ──────────────────────────────────────
   MIDDLEWARE
   ────────────────────────────────────── */

// CORS - Allow all local network IPs
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Allow localhost and local network IPs
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:3000$/,  // 192.168.x.x:3000
      /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}:3000$/,  // 10.x.x.x:3000
      /^http:\/\/172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}:3000$/  // 172.16-31.x.x:3000
    ];

    const isAllowed = allowedOrigins.some(pattern => {
      if (pattern instanceof RegExp) {
        return pattern.test(origin);
      }
      return pattern === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`⚠️  CORS blocked origin: ${origin}`);
      callback(null, true); // Allow anyway for local network flexibility
    }
  },
  credentials: true
}));

app.use(express.json());                    // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

// Monitoring middleware
app.use(trackConnection);
app.use(requestLogger);

// General rate limiting
app.use(generalLimiter);

/* ──────────────────────────────────────
   ROUTES
   ────────────────────────────────────── */
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);

/* ──────────────────────────────────────
   HEALTH CHECK & MONITORING
   ────────────────────────────────────── */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/stats', (req, res) => {
  const stats = getStats();
  const executionQueue = require('./services/executionQueue');
  stats.executionQueue = executionQueue.getStats();
  res.json(stats);
});

/* ──────────────────────────────────────
   STATIC FILE SERVING (Production)
   ────────────────────────────────────── */
// Serve static files from React build
const frontendBuildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendBuildPath));

/* ──────────────────────────────────────
   CLIENT-SIDE ROUTING FALLBACK
   ────────────────────────────────────── */
// All non-API routes serve index.html for React Router
app.get('*', (req, res) => {
  // Only serve index.html for non-API routes
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  } else {
    // API route not found
    res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
  }
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

  // Auto-seed questions if DB is empty
  try {
    const { seedQuestions } = require('../scripts/seed-manual');
    await seedQuestions(false); // false = do not force re-seed if data exists
  } catch (err) {
    console.error('Failed to auto-seed questions:', err);
    // Continue server startup even if seeding fails
  }

  // Bind to 0.0.0.0 to accept connections from local network
  app.listen(PORT, '0.0.0.0', () => {
    const os = require('os');
    const networkInterfaces = os.networkInterfaces();

    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`   Local: http://localhost:${PORT}`);

    // Display all local network IPs
    Object.keys(networkInterfaces).forEach(interfaceName => {
      networkInterfaces[interfaceName].forEach(iface => {
        if (iface.family === 'IPv4' && !iface.internal) {
          console.log(`   Network: http://${iface.address}:${PORT}`);
        }
      });
    });

    console.log(`\n   ✅ Application (Frontend + Backend) running on port ${PORT}`);
    console.log(`   🌐 Access from any device on your network:`);
    console.log(`   📱 Student portal: http://YOUR_IP:${PORT}`);
    console.log(`   👨‍💼 Admin panel: http://YOUR_IP:${PORT}/admin`);
    console.log(`\n   📊 Stats endpoint: http://localhost:${PORT}/api/stats`);
  });
})();
