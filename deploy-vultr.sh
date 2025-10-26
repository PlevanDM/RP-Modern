#!/bin/bash

echo "===================================="
echo "RepairHub Pro - Vultr Deployment"
echo "===================================="

# Update system
echo "[1/6] Updating system..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y git curl

# Install Docker
echo "[2/6] Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# Install Docker Compose
echo "[3/6] Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    apt-get install -y docker-compose-plugin
fi

# Configure firewall
echo "[4/6] Configuring firewall..."
ufw allow 3000/tcp
ufw --force enable

# Clone repository
echo "[5/6] Cloning repository..."
if [ -d "/root/repair-hub-pro" ]; then
    cd /root/repair-hub-pro
    git fetch origin
    git checkout eploy
    git pull origin eploy
else
    git clone --branch eploy https://github.com/PlevanDM/RP-Modern.git /root/repair-hub-pro
    cd /root/repair-hub-pro
fi

# Stop old containers
echo "[6/6] Stopping old containers..."
docker compose down 2>/dev/null || true
docker stop repair-hub-pro 2>/dev/null || true
docker rm repair-hub-pro 2>/dev/null || true

# Build and start
echo "Building Docker image (this may take 10-15 minutes)..."
docker compose build --no-cache

echo "Starting container..."
docker compose up -d

# Wait
sleep 10

# Check status
echo ""
echo "===================================="
echo "Deployment Status"
echo "===================================="
docker compose ps

echo ""
echo "Container logs:"
docker compose logs --tail=30

echo ""
echo "===================================="
echo "SUCCESS! Your app is running at:"
echo "http://70.34.252.148:3000"
echo "===================================="

