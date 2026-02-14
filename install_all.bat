@echo off
setlocal
echo ===================================================
echo     BUG HUNTERS - FULL INSTALLER
echo ===================================================

rem 0. Check for Admin Privileges via "net session"
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting Administrative Privileges...
    powershell -Command "Start-Process '%~dpnx0' -Verb RunAs"
    exit /b
)

echo [INFO] Running with Admin privileges.
echo.

rem 1. Enable WSL
echo [1/3] Setting up WSL...
wsl --status >nul 2>&1
if %errorlevel% neq 0 (
    echo    Installing WSL...
    wsl --install --no-distribution
    echo    [IMPORTANT] You may need to RESTART your computer after this finishes.
    echo    After restart, run this script again to continue.
) else (
    echo    [OK] WSL is already enabled.
)

rem 2. Install System Dependencies via Winget
echo.
echo [2/3] Checking System Dependencies (via Winget)...

rem Check Node
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo    [INSTALL] Node.js LTS...
    winget install OpenJS.NodeJS.LTS -e --silent --accept-source-agreements --accept-package-agreements
) else (
    echo    [OK] Node.js is installed.
)

rem Check Docker
docker -v >nul 2>&1
if %errorlevel% neq 0 (
    echo    [INSTALL] Docker Desktop...
    winget install Docker.DockerDesktop -e --silent --accept-source-agreements --accept-package-agreements
) else (
    echo    [OK] Docker is installed.
)

rem Check MongoDB (Tools)
mongosh --version >nul 2>&1
if %errorlevel% neq 0 (
    echo    [INSTALL] MongoDB Shell...
    winget install MongoDB.Shell -e --silent --accept-source-agreements --accept-package-agreements
)

rem Check MongoDB (Server)
sc query MongoDB >nul 2>&1
if %errorlevel% neq 0 (
    echo    [INSTALL] MongoDB Server...
    winget install MongoDB.Server -e --silent --accept-source-agreements --accept-package-agreements
)

rem 3. Project Setup (npm install)
echo.
echo [3/3] Setting up Project (npm install)...
call setup.bat

echo.
echo ===================================================
echo Installer Completed.
echo If Docker/WSL was just installed, please RESTART your PC.
call check_setup.bat
pause
