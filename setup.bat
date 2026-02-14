@echo off
setlocal
echo ===================================================
echo     BUG HUNTERS PLATFORM - AUTOMATED SETUP
echo ===================================================
echo.

:: 1. Check Node.js
echo [1/4] Checking Node.js installation...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is NOT installed.
    echo Please install Node.js (v16 or higher) from https://nodejs.org/
    echo using the installer for Windows.
    pause
    exit /b 1
)
echo [OK] Node.js found.
echo.

:: 2. Setup Backend
echo [2/4] Setting up Backend...
cd backend
if not exist .env (
    if exist .env.example (
        echo [INFO] Creating .env from template...
        copy .env.example .env >nul
    ) else (
        echo [WARNING] .env.example not found in backend.
    )
)
echo [INFO] Installing backend dependencies (this may take a moment)...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Backend npm install failed.
    pause
    exit /b 1
)
cd ..
echo [OK] Backend setup complete.
echo.

:: 3. Setup Frontend
echo [3/4] Setting up Frontend...
cd frontend
if not exist .env (
    if exist .env.example (
        echo [INFO] Creating .env from template...
        copy .env.example .env >nul
    )
)
echo [INFO] Installing frontend dependencies (this may take a moment)...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Frontend npm install failed.
    pause
    exit /b 1
)
cd ..
echo [OK] Frontend setup complete.
echo.

:: 3.5 Seed Database
echo [3.5] Seeding Database...
cd scripts
call node seed-manual.js
if %errorlevel% neq 0 (
    echo [WARNING] Database seeding failed or skipped.
) else (
    echo [OK] Database seeded successfully.
)
cd ..
echo.

:: 4. Finalize
echo [4/4] Finalizing...
echo.
echo ===================================================
echo           SETUP COMPLETED SUCCESSFULLY!
echo ===================================================
echo.
echo To start the application:
echo 1. Open a terminal for the BACKEND:
echo    cd backend
echo    npm start
echo.
echo 2. Open a terminal for the FRONTEND:
echo    cd frontend
echo    npm start
echo.
echo Press any key to exit...
pause >nul
