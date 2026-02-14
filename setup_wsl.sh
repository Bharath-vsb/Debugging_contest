#!/bin/bash

# ==========================================
# Bug Hunters Platform - WSL/Linux Setup Script
# ==========================================

set -e # Exit immediately if a command exits with a non-zero status

echo "🚀 Starting Automated Setup for WSL/Linux..."
echo "=========================================="

# ------------------------------------------
# 1. Check Prerequisites
# ------------------------------------------

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is NOT installed."
    echo "   Please install it: https://nodejs.org/en/download/package-manager/"
    exit 1
else
    NODE_VERSION=$(node -v)
    echo "✅ Node.js found: $NODE_VERSION"
fi

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is NOT installed or not in PATH."
    echo "   Code execution features will NOT work without Docker."
    echo "   Install Docker Desktop for Windows (with WSL 2 backend)."
    # We don't exit here because the app might still run partially (frontend/basic backend)
else
    if ! docker info &> /dev/null; then
        echo "⚠️  Docker is installed but does not seem to be running."
        echo "   Please start Docker Desktop."
    else
        echo "✅ Docker is running."
    fi
fi

# ------------------------------------------
# 2. Backend Setup
# ------------------------------------------
echo ""
echo "📦 Setting up Backend..."
cd backend

# .env setup
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        echo "   📄 Creating .env from .env.example..."
        cp .env.example .env
    else
        echo "   ⚠️  .env.example not found!"
    fi
else
    echo "   📄 .env already exists."
fi

# Install dependencies
echo "   📥 Installing backend dependencies..."
npm install

cd ..

# ------------------------------------------
# 3. Frontend Setup
# ------------------------------------------
echo ""
echo "📦 Setting up Frontend..."
cd frontend

# .env setup
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        echo "   📄 Creating .env from .env.example..."
        cp .env.example .env
    fi
fi

# Install dependencies
echo "   📥 Installing frontend dependencies..."
npm install

cd ..

# ------------------------------------------
# 4. Pull Sandbox Images (Optional but recommended)
# ------------------------------------------
if command -v docker &> /dev/null && docker info &> /dev/null; then
    echo ""
    echo "🐳 Pre-pulling compiler images for code execution..."
    echo "   (This prevents timeout on the first user submission)"
    
    docker pull gcc:12-alpine || echo "   ⚠️ Failed to pull gcc:12-alpine"
    docker pull python:3.11-alpine || echo "   ⚠️ Failed to pull python:3.11-alpine"
    docker pull openjdk:17-alpine || echo "   ⚠️ Failed to pull openjdk:17-alpine"
else
    echo ""
    echo "⚠️  Skipping Docker image pull (Docker not ready)."
fi

# ------------------------------------------
# 5. Final Instructions
# ------------------------------------------
echo ""
echo "=========================================="
echo "✅ Setup Completed Successfully!"
echo "=========================================="
echo ""
echo "To starting the application:"
echo ""
echo "   Terminal 1 (Backend):"
echo "     cd backend && npm start"
echo ""
echo "   Terminal 2 (Frontend):"
echo "     cd frontend && npm start"
echo ""
echo "Happy Debugging! 🐞"
