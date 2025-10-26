#!/bin/bash

# Quick fix script for RepairHub Pro
# Execute on server via SSH

cd /root/repair-hub-pro

# Stop container
docker compose down

# Check if files exist
echo "Checking files..."
ls -la dist/
ls -la dist/index.html

# Restart with detailed output
echo "Starting container..."
docker compose up -d

# Wait
sleep 5

# Check logs
echo "Recent logs:"
docker compose logs --tail=20

# Test locally
echo "Testing from inside container..."
docker exec repair-hub-pro ls -la /app/dist/

echo "Checking serve process..."
docker exec repair-hub-pro ps aux

