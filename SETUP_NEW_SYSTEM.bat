@echo off
REM ===================================================
REM  CONTEST PLATFORM - FIRST TIME SETUP
REM ===================================================
REM  Run this script ONCE when setting up on a new system
REM  It will install all dependencies for the platform
REM ===================================================

title Contest Platform - First Time Setup
color 0A

echo.
echo ===================================================
echo   CONTEST PLATFORM - FIRST TIME SETUP
echo ===================================================
echo.
echo This script will:
echo   1. Check for Node.js and npm
echo   2. Install root dependencies
echo   3. Install backend dependencies
echo   4. Install frontend dependencies
echo   5. Build the frontend
echo.
echo This may take 5-10 minutes depending on your internet speed.
echo.
if "%1"=="nopause" goto :SKIP_PAUSE
pause
:SKIP_PAUSE

:CHECK_NODE
echo.
echo [1/6] Checking for Node.js...
echo.
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please download and install Node.js from:
    echo https://nodejs.org/
    echo.
    echo After installing Node.js, restart this script.
    echo.
    pause
    exit /b 1
)

node --version
npm --version
echo [OK] Node.js and npm are installed.

:INSTALL_ROOT
echo.
echo [2/6] Installing root dependencies...
echo.
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install root dependencies!
    pause
    exit /b 1
)
echo [OK] Root dependencies installed.

:INSTALL_BACKEND
echo.
echo [3/6] Installing backend dependencies...
echo.
cd backend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install backend dependencies!
    cd ..
    pause
    exit /b 1
)
cd ..
echo [OK] Backend dependencies installed.

:INSTALL_FRONTEND
echo.
echo [4/6] Installing frontend dependencies...
echo.
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install frontend dependencies!
    cd ..
    pause
    exit /b 1
)
cd ..
echo [OK] Frontend dependencies installed.

:BUILD_FRONTEND
echo.
echo [5/6] Building frontend for production...
echo.
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build frontend!
    cd ..
    pause
    exit /b 1
)
cd ..
echo [OK] Frontend built successfully.

:CHECK_MONGODB
echo.
echo [6/6] Checking MongoDB connection...
echo.
echo NOTE: Make sure MongoDB is running on localhost:27017
echo       or update the MONGO_URI in the .env file
echo.

:COMPLETE
echo.
echo ===================================================
echo   SETUP COMPLETE!
echo ===================================================
echo.
echo Next steps:
echo   1. Make sure MongoDB is running
echo   2. Run 'seed_database.bat' to populate questions
echo   3. Run 'start_local.bat' to start the server locally
echo   4. Run 'start_network.bat' to start for network access
echo.
echo For help, see QUICK_START.md
echo.
pause
