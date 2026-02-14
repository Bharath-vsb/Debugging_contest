# Bug Hunters Platform - Setup Guide

This project comes with an automated setup script for Windows.

## 🚀 One-Click Setup (Windows)

1.  **Double-click** `setup.bat` in the root folder.
2.  The script will:
    *   Check if Node.js is installed.
    *   Install all necessary libraries for Backend and Frontend.
    *   Create configuration files (`.env`) automatically.
3.  Wait for the "SETUP COMPLETED SUCCESSFULLY" message.

## 🐧 Automated Setup (Linux / WSL)

1.  Open your terminal in the project root.
2.  Run the setup script:
    ```bash
    bash setup_wsl.sh
    ```
3.  The script will:
    *   Check for Node.js and Docker.
    *   Install Backend & Frontend dependencies.
    *   Setup `.env` files.
    *   Pull necessary Docker images for the sandbox.

## 🛠 Manual Setup

If the scripts don't work or you prefer manual control:

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env if needed (default is localhost:27017 for MongoDB)
```

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env
```

## ▶ How to Run

You need **two** terminals running:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```
*Server will start on http://localhost:5000*

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```
*App will start on http://localhost:3000*
