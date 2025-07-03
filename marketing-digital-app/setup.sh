#!/bin/bash

# CaktoDigital Setup Script
# This script will set up the entire digital marketing platform

echo "🚀 CaktoDigital - Setup Script"
echo "==============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    echo "   Please update Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not available. Please install npm."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
echo "This may take a few minutes..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "⚙️  Creating environment configuration..."
    cp .env.example .env
    echo "✅ .env file created from .env.example"
    echo "📝 Please edit .env file with your configurations"
else
    echo "✅ .env file already exists"
fi

# Check if MongoDB is running (optional)
echo ""
echo "🗄️  Checking MongoDB connection..."

if command -v mongod &> /dev/null; then
    echo "✅ MongoDB is installed locally"
    
    # Try to connect to MongoDB
    if timeout 5 mongo --eval "db.runCommand('ping').ok" localhost:27017/test &>/dev/null; then
        echo "✅ MongoDB is running and accessible"
    else
        echo "⚠️  MongoDB is not running. Starting MongoDB..."
        echo "   You may need to start MongoDB manually:"
        echo "   - Run: mongod"
        echo "   - Or use Docker: docker run -d -p 27017:27017 --name mongodb mongo:6"
    fi
else
    echo "⚠️  MongoDB not found locally"
    echo "   Options:"
    echo "   1. Install MongoDB: https://docs.mongodb.com/manual/installation/"
    echo "   2. Use Docker: docker run -d -p 27017:27017 --name mongodb mongo:6"
    echo "   3. Use MongoDB Atlas: https://www.mongodb.com/cloud/atlas"
fi

# Create necessary directories
echo ""
echo "📁 Creating project directories..."
mkdir -p uploads
mkdir -p logs
mkdir -p components
mkdir -p lib
mkdir -p public/images
echo "✅ Directories created"

# Install global dependencies (optional)
echo ""
echo "🌐 Checking global dependencies..."

if ! command -v typescript &> /dev/null; then
    echo "📦 Installing TypeScript globally..."
    npm install -g typescript
fi

if ! command -v concurrently &> /dev/null; then
    echo "📦 Installing concurrently globally..."
    npm install -g concurrently
fi

# Run initial build to check everything works
echo ""
echo "🔨 Running initial build test..."
npm run build

if [ $? -ne 0 ]; then
    echo "⚠️  Build test failed, but dependencies are installed"
    echo "   You can manually fix any issues and run: npm run build"
else
    echo "✅ Build test successful"
fi

# Final instructions
echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Edit .env file with your configurations"
echo "   2. Make sure MongoDB is running"
echo "   3. Start the application:"
echo ""
echo "      # Start both frontend and backend:"
echo "      npm run dev:full"
echo ""
echo "      # Or start separately:"
echo "      npm run server    # Backend (port 5000)"
echo "      npm run dev       # Frontend (port 3000)"
echo ""
echo "🌐 Access the application:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:5000/api"
echo "   - Health Check: http://localhost:5000/api/health"
echo ""
echo "📚 Documentation: See README.md for detailed instructions"
echo ""
echo "Happy coding! 🚀"