# System Requirements

To run the **Bug Hunters Platform** correctly, ensure your system meets the following requirements.

## 1. Operating System
*   **Windows 10/11** (with WSL 2 enabled is recommended for development).
*   **Linux** (Ubuntu 20.04+ or similar).
*   **macOS** (compatible, but this guide focuses on Windows/Linux).

## 2. Core Software
*   **Node.js**:
    *   **Version**: v16.x, v18.x, or v20.x (LTS recommended).
    *   *Why*: Required to run both the Backend (Express) and Frontend (React).
    *   [Download Node.js](https://nodejs.org/)
*   **Git**:
    *   Required to clone the repository and manage version control.
    *   [Download Git](https://git-scm.com/)

## 3. Database
*   **MongoDB**:
    *   **Option A (Recommended)**: Docker Container (handled via `docker-compose`).
    *   **Option B**: Local Installation (MongoDB Community Server).
    *   **Connection**: Default URI is `mongodb://localhost:27017/debugcontest`.

## 4. Code Execution Sandbox (Critical for functionality)
The platform executes user code (C, Java, Python) in isolated containers.
*   **Docker Desktop**:
    *   Must be installed and running.
    *   **WSL 2 Backend**: Ensure Docker is configured to use the WSL 2 based engine.
    *   [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

## 5. Docker Images used
The system will attempt to pull these automatically, but you can pull them manually to verify Docker is working:
*   `gcc:12-alpine` (for C code)
*   `python:3.11-alpine` (for Python code)
*   `openjdk:17-alpine` (for Java code)

## 6. Frontend Requirements
*   **Web Browser**: Chrome, Firefox, or Edge (latest versions).
