@echo off
REM ===================================================
REM  START LOCAL - Run server on localhost only
REM ===================================================
REM  Use this for local development/testing
REM  Access at: http://localhost:5000
REM ===================================================

title Contest Platform - Local Server
color 0E

echo.
echo ===================================================
echo   STARTING LOCAL SERVER
echo ===================================================
echo.
echo Server will be accessible at:
echo   http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Check if MongoDB is running
echo [1/2] Checking MongoDB...
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/debugcontest', {serverSelectionTimeoutMS: 2000}).then(() => { console.log('[OK] MongoDB connected'); process.exit(0); }).catch(() => { console.error('[WARNING] MongoDB not detected'); process.exit(0); });"

echo.
echo [2/2] Starting server...
echo.

cd backend
node server.js

pause
