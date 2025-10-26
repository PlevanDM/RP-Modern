#!/bin/bash

# Quick deployment script for Vultr

echo "=== RepairHub Pro Deployment ==="

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    
    echo "Installing Docker Compose..."
    apt-get install -y docker-compose-plugin git
    
    echo "Configuring firewall..."
    ufw allow 3000/tcp --yes
    
    echo "Cloning repository..."
    git clone --branch eploy https://github.com/PlevanDM/RP-Modern.git /root/repair-hub-pro
    cd /root/repair-hub-pro
else
    echo "Already in project directory"
fi

echo "Stopping existing containers..."
docker compose down 2>/dev/null || true

echo "Building and starting..."
docker compose build --no-cache
docker compose up -d

echo "Waiting 10 seconds..."
sleep 10

echo "Checking status..."
docker compose ps

echo "=== Deployment complete ==="
echo "Access: http://70.34.252.148:3000"
echo "View logs: docker compose logs -f"

