@echo off
REM ===================================================
REM  START NETWORK - Run server for network access
REM ===================================================
REM  Use this to allow other devices to connect
REM  Server accessible on local network
REM ===================================================

title Contest Platform - Network Server
color 0E

echo.
echo ===================================================
echo   STARTING NETWORK SERVER
echo ===================================================
echo.
echo This will:
echo   1. Build the frontend (production mode)
echo   2. Start the backend server
echo.
echo Server will be accessible from any device on your network.
echo.
echo Press Ctrl+C to stop the server
echo.
if "%1"=="nopause" goto :SKIP_PAUSE
pause
:SKIP_PAUSE

echo.
echo [1/3] Checking MongoDB...
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/debugcontest', {serverSelectionTimeoutMS: 2000}).then(() => { console.log('[OK] MongoDB connected'); process.exit(0); }).catch(() => { console.error('[WARNING] MongoDB not detected - server may fail'); process.exit(0); });"

echo.
echo [2/3] Building frontend...
echo.
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Frontend build failed!
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo [3/3] Starting server...
echo.
cd backend
node server.js

pause
