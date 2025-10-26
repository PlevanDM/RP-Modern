#!/bin/bash

# Quick install script for Vultr server
# Copy and paste this entire block into your Vultr server terminal

set -e

echo "========================================"
echo "RepairHub Pro - Quick Installation"
echo "========================================"

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# Install Docker Compose if not installed
if ! command -v docker &> /dev/null || [ ! -f "/usr/libexec/docker/cli-plugins/docker-compose" ]; then
    echo "Installing Docker Compose..."
    apt-get update -qq
    apt-get install -y docker-compose-plugin git
fi

# Configure firewall
echo "Configuring firewall..."
ufw allow 3000/tcp
ufw --force enable

# Clone or update repository
if [ -d "/root/repair-hub-pro" ]; then
    echo "Updating existing repository..."
    cd /root/repair-hub-pro
    git fetch origin
    git checkout eploy
    git pull origin eploy
else
    echo "Cloning repository..."
    git clone --branch eploy https://github.com/PlevanDM/RP-Modern.git /root/repair-hub-pro
    cd /root/repair-hub-pro
fi

# Stop and remove old containers
echo "Stopping old containers..."
docker compose down 2>/dev/null || true
docker stop repair-hub-pro 2>/dev/null || true
docker rm repair-hub-pro 2>/dev/null || true

# Build and start
echo "Building Docker image (this may take 5-10 minutes)..."
docker compose build --no-cache

echo "Starting container..."
docker compose up -d

# Wait
echo "Waiting for container to start..."
sleep 10

# Check status
echo ""
echo "========================================"
echo "Status Check"
echo "========================================"
docker compose ps

echo ""
echo "Container logs (last 20 lines):"
docker compose logs --tail=20

echo ""
echo "========================================"
echo "Installation complete!"
echo "========================================"
echo "Access your app at: http://70.34.252.148:3000"
echo ""
echo "Useful commands:"
echo "  docker compose logs -f     - View logs"
echo "  docker compose restart     - Restart"
echo "  docker compose down        - Stop"

