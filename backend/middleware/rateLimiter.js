/**
 * rateLimiter.js
 * ──────────────
 * Rate limiting middleware to prevent abuse and handle high concurrent load.
 * Different limits for different endpoint types.
 */

const rateLimit = require('express-rate-limit');

// General API rate limiter - 100 requests per minute per IP
// General API rate limiter - 3000 requests per minute per IP (approx 50 req/sec total)
const generalLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 3000,
    message: { success: false, message: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Registration rate limiter - 100 per 5 minutes (in case of bulk registration from one IP)
const registrationLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100,
    message: { success: false, message: 'Too many registration attempts. Please wait before trying again.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Submission rate limiter - 1000 submissions per minute per IP
const submissionLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1000,
    message: { success: false, message: 'Too many submissions. Please wait before submitting again.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Admin login rate limiter - 10 attempts per 15 minutes per IP
const adminLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: { success: false, message: 'Too many login attempts. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    generalLimiter,
    registrationLimiter,
    submissionLimiter,
    adminLoginLimiter
};
