#!/bin/bash
# Deployment script for RepairHub Pro
# Run this on the server: ssh root@70.34.252.148

echo "=========================================="
echo "  RepairHub Pro - Deployment Script"
echo "=========================================="
echo ""

# Navigate to project
cd /root/repair-hub-pro || exit

echo "[1/6] Pulling latest changes from GitHub..."
git pull origin eploy

echo ""
echo "[2/6] Stopping Docker containers..."
docker compose down

echo ""
echo "[3/6] Building new Docker images..."
docker compose build --no-cache

echo ""
echo "[4/6] Starting containers..."
docker compose up -d

echo ""
echo "[5/6] Waiting for services to start (20 seconds)..."
sleep 20

echo ""
echo "[6/6] Checking status..."
docker compose ps
echo ""
docker logs repair-hub-pro --tail=20

echo ""
echo "=========================================="
echo "  Deployment Complete!"
echo "=========================================="
echo "  Website: http://70.34.252.148:3000"
echo "  Or your domain: https://repairhub.com"
echo "=========================================="

