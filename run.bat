@echo off
setlocal enabledelayedexpansion
title Contest Platform - Auto Launcher

REM ===================================================
REM  CONFIGURATION
REM ===================================================
set "STATUS_LOG=status.log"
set "ERROR_LOG=error.log"

REM Initialize Logs
echo [INFO] Launcher started at %date% %time% > "%STATUS_LOG%"
echo [INFO] Launcher started at %date% %time% > "%ERROR_LOG%"

REM Function to log status
call :LOG_STATUS "Initializing Auto Launcher..."

REM ===================================================
REM  1. CHECK NODE.JS
REM ===================================================
call :LOG_STATUS "Checking Node.js installation..."
node --version >> "%STATUS_LOG%" 2>> "%ERROR_LOG%"
if %errorlevel% neq 0 (
    call :LOG_ERROR "Node.js is not installed."
    call :LOG_STATUS "Attempting to install Node.js..."
    
    echo [!] Node.js missing. Launching installer...
    
    REM Call existing setup script if available, or error out
    if exist "SETUP_NEW_SYSTEM.bat" (
        call SETUP_NEW_SYSTEM.bat nopause
    ) else (
        call :LOG_ERROR "SETUP_NEW_SYSTEM.bat not found. Cannot auto-install."
        goto :ERROR_EXIT
    )
) else (
    call :LOG_STATUS "Node.js is installed."
)

REM ===================================================
REM  2. CHECK MONGODB
REM ===================================================
call :LOG_STATUS "Checking MongoDB connection..."
echo Checking MongoDB...
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/debugcontest', {serverSelectionTimeoutMS: 2000}).then(() => process.exit(0)).catch((e) => { console.error(e.message); process.exit(1); });" >> "%STATUS_LOG%" 2>> "%ERROR_LOG%"

if %errorlevel% neq 0 (
    call :LOG_ERROR "MongoDB is not running or not installed."
    echo [!] MongoDB not detected.
    echo     Please make sure MongoDB service is running (net start MongoDB).
    
    REM Optional: Try to start it? (Requires admin)
    rem net start MongoDB >> "%STATUS_LOG%" 2>> "%ERROR_LOG%"
    
    echo.
    echo Waiting 5 seconds to see if it starts...
    timeout /t 5 >nul
) else (
    call :LOG_STATUS "MongoDB is reachable."
)

REM ===================================================
REM  3. SEED DATABASE
REM ===================================================
call :LOG_STATUS "Ensuring database is populated..."
if exist "seed_database.bat" (
    call :LOG_STATUS "Running seed_database.bat..."
    call seed_database.bat nopause >> "%STATUS_LOG%" 2>> "%ERROR_LOG%"
) else (
    call :LOG_ERROR "seed_database.bat not found. Skipping seed."
)

REM ===================================================
REM  4. START SERVER
REM ===================================================
call :LOG_STATUS "Starting server in NETWORK mode..."
echo.
echo [INFO] Starting Server...
echo         Status: %STATUS_LOG%
echo         Errors: %ERROR_LOG%
echo.

if exist "start_network.bat" (
    call :LOG_STATUS "Launching start_network.bat..."
    
    REM Launch and exit, or stay? User said "start automatically".
    REM We will simply call it.
    call start_network.bat nopause
) else (
    call :LOG_ERROR "start_network.bat missing!"
    goto :ERROR_EXIT
)

goto :EOF

REM ===================================================
REM  HELPER FUNCTIONS
REM ===================================================

:LOG_STATUS
echo [STATUS] %~1
echo [%time%] %~1 >> "%STATUS_LOG%"
exit /b 0

:LOG_ERROR
echo [ERROR] %~1
echo [%time%] [ERROR] %~1 >> "%ERROR_LOG%"
echo [%time%] [ERROR] %~1 >> "%STATUS_LOG%"
exit /b 0

:ERROR_EXIT
echo.
echo [FATAL] An error occurred. Check %ERROR_LOG% for details.
pause
exit /b 1
