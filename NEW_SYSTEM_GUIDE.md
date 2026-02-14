# 🚀 Quick Start Guide - New System Setup

This guide will help you set up the Contest Platform on a **brand new system** in just a few steps.

## 📋 Prerequisites

Before you begin, make sure you have:
- **Windows 10/11** (64-bit)
- **Internet connection**
- **MongoDB** installed and running (or install via `install_all.bat`)

## 🎯 Quick Setup (3 Steps)

### Step 1: First-Time Setup
Run this **ONCE** on a new system:
```batch
SETUP_NEW_SYSTEM.bat
```
This will:
- Check for Node.js
- Install all dependencies (root, backend, frontend)
- Build the frontend
- Takes 5-10 minutes

### Step 2: Seed the Database
Populate the database with questions:
```batch
seed_database.bat
```
This will:
- Check MongoDB connection
- Add programming questions to the database
- Safe to run multiple times (won't duplicate)

### Step 3: Start the Server
Choose one based on your needs:

**For Local Testing:**
```batch
start_local.bat
```
- Access at: `http://localhost:5000`
- Only accessible from this computer

**For Network Access (Contest Day):**
```batch
start_network.bat
```
- Accessible from any device on your network
- Students can connect from their computers
- Shows network IP addresses on startup

## 📁 Batch Files Overview

| File | Purpose | When to Use |
|------|---------|-------------|
| `SETUP_NEW_SYSTEM.bat` | First-time installation | Once on new system |
| `seed_database.bat` | Populate questions | After setup, before first use |
| `start_local.bat` | Local development | Testing locally |
| `start_network.bat` | Network server | Contest day / network access |
| `run.bat` | Auto-launcher (existing) | Auto-detects and fixes issues |

## 🔧 Troubleshooting

### MongoDB Not Running
**Error:** "Cannot connect to MongoDB"

**Solution:**
```batch
net start MongoDB
```
Or start MongoDB Compass application.

### Node.js Not Found
**Error:** "Node.js is not installed"

**Solution:**
1. Download from: https://nodejs.org/
2. Install LTS version
3. Restart terminal
4. Run `SETUP_NEW_SYSTEM.bat` again

### Port Already in Use
**Error:** "Port 5000 is already in use"

**Solution:**
1. Close any running servers
2. Check Task Manager for `node.exe` processes
3. Kill them and restart

## 📱 Accessing the Platform

### Student Portal
```
http://YOUR_IP:5000
```

### Admin Panel
```
http://YOUR_IP:5000/admin
```
Default credentials: Check `.env` file

### Stats Endpoint
```
http://YOUR_IP:5000/api/stats
```

## 🎓 Contest Day Checklist

- [ ] Run `SETUP_NEW_SYSTEM.bat` (if first time)
- [ ] Run `seed_database.bat` (to ensure questions are loaded)
- [ ] Start MongoDB service
- [ ] Run `start_network.bat`
- [ ] Note down the network IP address shown
- [ ] Share IP with students: `http://YOUR_IP:5000`
- [ ] Test admin panel access
- [ ] Keep server window open during contest

## 💡 Tips

1. **Always run `seed_database.bat` after setup** - Ensures questions are in the database
2. **Use `start_network.bat` for contests** - Allows network access
3. **Keep MongoDB running** - Server won't work without it
4. **Don't close the server window** - It will stop the server
5. **Check firewall** - Windows may block network access (allow Node.js)

## 📞 Need Help?

Check the existing documentation:
- `README.md` - Full documentation
- `SETUP.md` - Detailed setup guide
- `REQUIREMENTS.md` - System requirements
