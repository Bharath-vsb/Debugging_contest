@echo off
setlocal
echo ===================================================
echo     BUG HUNTERS - START SERVER
echo ===================================================

echo Checking system health...
call check_setup.bat
if %errorlevel% neq 0 (
    echo.
    echo [STOP] Cannot start server because system check failed.
    echo Please run 'install_all.bat' first.
    pause
    exit /b 1
)

echo.
echo [OK] System healthy. Starting servers...
echo.

start "Contest Platform - BACKEND" cmd /k "cd backend && npm start"
timeout /t 3 >nul
start "Contest Platform - FRONTEND" cmd /k "cd frontend && npm start"

echo Servers launched in new windows!
echo Backend:   http://localhost:5000
echo Frontend:  http://localhost:3000
echo.
pause
