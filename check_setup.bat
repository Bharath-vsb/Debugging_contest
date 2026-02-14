@echo off
setlocal EnableDelayedExpansion
cls
echo ===================================================
echo   BUG HUNTERS - SYSTEM DIAGNOSTIC
echo ===================================================

set "MISSING=0"

rem 1. Check WSL
echo.
echo [1/5] Checking WSL Status...
wsl --status >nul 2>&1
if %errorlevel% neq 0 (
    echo    [X] WSL is NOT installed or functional.
    set "MISSING=1"
) else (
    echo    [OK] WSL is operational.
)

rem 2. Check Node.js
echo.
echo [2/5] Checking Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo    [X] Node.js is NOT installed.
    set "MISSING=1"
) else (
    for /f "delims=" %%v in ('node -v') do set NODE_VER=%%v
    echo    [OK] Node.js found !NODE_VER!
)

rem 3. Check Docker
echo.
echo [3/5] Checking Docker...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo    [X] Docker is NOT running.
    echo        Attempting to start Docker Desktop...
    
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    
    echo        Waiting for Docker Engine to initialize...
    
    rem Wait loop (up to 12 * 5s = 60s)
    for /L %%i in (1,1,12) do (
        timeout /t 5 >nul
        docker info >nul 2>&1
        if !errorlevel! equ 0 (
            echo        [OK] Docker started successfully!
            goto :DOCKER_DONE
        ) else (
            echo        ...still waiting (%%i/12^)
        )
    )
    
    echo    [FAIL] Timed out waiting for Docker. Please start it manually.
    set "MISSING=1"
) else (
    echo    [OK] Docker Daemon is running.
    
    rem Check for required images
    docker images -q gcc:12-alpine >nul 2>&1
    if %errorlevel% neq 0 (
        echo    [!] Missing Docker Image: gcc:12-alpine
        set "MISSING_IMAGES=1"
    )
    docker images -q eclipse-temurin:17-jdk-alpine >nul 2>&1
    if %errorlevel% neq 0 (
        echo    [!] Missing Docker Image: eclipse-temurin:17-jdk-alpine
        set "MISSING_IMAGES=1"
    )
    docker images -q python:3.11-alpine >nul 2>&1
    if %errorlevel% neq 0 (
        echo    [!] Missing Docker Image: python:3.11-alpine
        set "MISSING_IMAGES=1"
    )
    
    if "!MISSING_IMAGES!"=="1" (
        echo    [!] Some Docker images are missing. Attempting to pull them...
        call pull_images.bat
    ) else (
        echo    [OK] All required Docker images present.
    )
)

:DOCKER_DONE

rem 4. Check MongoDB Connectivity
echo.
echo [4/5] Checking MongoDB Connection...
if exist "scripts\check-mongo.js" (
    node scripts\check-mongo.js >nul 2>&1
    if !errorlevel! neq 0 (
        echo    [X] Cannot connect to MongoDB. Is it running?
        set "MISSING=1"
    ) else (
        echo    [OK] MongoDB is accessible.
    )
) else (
    echo    [?] Mongo check script missing at scripts\check-mongo.js, skipping...
)

rem 5. Check Project Dependencies
echo.
echo [5/5] Checking Project Dependencies...
if exist "backend\node_modules" (
    echo    [OK] Backend modules found.
) else (
    echo    [X] Backend modules MISSING.
    set "MISSING=1"
)
if exist "frontend\node_modules" (
    echo    [OK] Frontend modules found.
) else (
    echo    [X] Frontend modules MISSING.
    set "MISSING=1"
)

echo.
echo ===================================================
if !MISSING! equ 1 (
    echo [FAIL] System check failed. 
    echo Please run 'install_all.bat' or 'force_install.bat' to fix issues.
    exit /b 1
) else (
    echo [PASS] All systems are GO!
    exit /b 0
)
