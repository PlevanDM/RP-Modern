#!/bin/sh

# VULTR STARTUP SCRIPT - Paste this into Vultr Startup Script field
# This script will be executed automatically when the server is created

set -e

APP_DIR="/root/repair-hub-pro"
CONTAINER_NAME="repair-hub-pro"
HOST_PORT="3000"

echo "Starting RepairHub Pro deployment..."

# Update system
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get upgrade -y -qq

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# Install Docker Compose
apt-get install -y docker-compose-plugin git

# Configure firewall
if command -v ufw &> /dev/null; then
    ufw allow $HOST_PORT/tcp
fi

# Clone repository
if [ -d "$APP_DIR" ]; then
    cd "$APP_DIR"
    git fetch origin
    git checkout eploy
    git pull origin eploy
else
    git clone --branch eploy https://github.com/PlevanDM/RP-Modern.git "$APP_DIR"
    cd "$APP_DIR"
fi

# Stop existing containers
docker compose down 2>/dev/null || true
docker stop "$CONTAINER_NAME" 2>/dev/null || true
docker rm "$CONTAINER_NAME" 2>/dev/null || true

# Build and start
docker compose build --no-cache
docker compose up -d

# Wait for container
sleep 5

# Check status
if docker ps | grep -q "$CONTAINER_NAME"; then
    echo "[OK] RepairHub Pro is running!"
    SERVER_IP=$(curl -s ifconfig.me || echo 'YOUR_SERVER_IP')
    echo "Access: http://$SERVER_IP:$HOST_PORT"
else
    echo "[ERROR] Container failed to start. Check logs: docker compose logs"
fi

