@echo off
setlocal
echo ===================================================
echo     BUG HUNTERS - FORCE INSTALLER
echo     (Overriding existing configurations)
echo ===================================================

rem 0. Check for Admin Privileges
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting Administrative Privileges...
    powershell -Command "Start-Process '%~dpnx0' -Verb RunAs"
    exit /b
)

echo [WARNING] This will attempt to force-install dependencies.
echo.

rem 1. Force WSL Update/Install
echo [FORCE] Updating WSL...
wsl --update

rem 2. Force Node Re-install (repair)
echo [FORCE] Re-installing Node.js...
winget install OpenJS.NodeJS.LTS --force -e --silent --accept-source-agreements --accept-package-agreements

rem 3. Force Project Setup request
echo [FORCE] Re-installing Project Dependencies...

echo    Cleaning backend...
if exist "backend\node_modules" rmdir /s /q "backend\node_modules"
if exist "backend\package-lock.json" del "backend\package-lock.json"

echo    Cleaning frontend...
if exist "frontend\node_modules" rmdir /s /q "frontend\node_modules"
if exist "frontend\package-lock.json" del "frontend\package-lock.json"

echo    Running clean setup...
call setup.bat

echo.
echo [DONE] Force install sequence completed.
pause
