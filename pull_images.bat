@echo off
echo ===========================================
echo   Pulling Required Docker Images
echo   (This may take a few minutes...)
echo ===========================================

echo.
echo [1/3] Pulling GCC (C)...
docker pull gcc:12-alpine

echo.
echo [2/3] Pulling OpenJDK (Eclipse Temurin)...
docker pull eclipse-temurin:17-jdk-alpine

echo.
echo [3/3] Pulling Python...
docker pull python:3.11-alpine

echo.
echo ===========================================
echo   All images pulled successfully!
echo ===========================================
pause
