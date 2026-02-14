@echo off
REM ===================================================
REM  SEED DATABASE - Populate Questions
REM ===================================================
REM  Run this to populate the database with questions
REM  Safe to run multiple times (won't duplicate data)
REM ===================================================

title Contest Platform - Seed Database
color 0B

echo.
echo ===================================================
echo   SEED DATABASE - POPULATE QUESTIONS
echo ===================================================
echo.
echo This will populate the database with programming questions.
echo.
echo NOTE: Make sure MongoDB is running before proceeding!
echo.
if "%1"=="nopause" goto :SKIP_PAUSE
pause
:SKIP_PAUSE

echo.
echo [1/2] Checking MongoDB connection...
echo.

REM Try to connect to MongoDB
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/debugcontest').then(() => { console.log('MongoDB connected'); process.exit(0); }).catch((e) => { console.error('MongoDB connection failed:', e.message); process.exit(1); });" 2>nul

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Cannot connect to MongoDB!
    echo.
    echo Please make sure:
    echo   1. MongoDB is installed
    echo   2. MongoDB service is running
    echo   3. MongoDB is accessible at localhost:27017
    echo.
    echo To start MongoDB service:
    echo   - Windows: net start MongoDB
    echo   - Or start MongoDB Compass
    echo.
    pause
    exit /b 1
)

echo [OK] MongoDB is running.

echo.
echo [2/2] Seeding questions...
echo.

node scripts\seed-manual.js

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Seeding failed!
    echo.
    pause
    exit /b 1
)

echo.
echo ===================================================
echo   SEEDING COMPLETE!
echo ===================================================
echo.
echo Questions have been added to the database.
echo You can now start the server.
echo.
pause
