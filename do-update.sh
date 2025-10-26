#!/bin/bash

echo "=== Updating RepairHub to Node.js 20 ==="
cd /root/repair-hub-pro

echo "Step 1: Updating Dockerfile..."
sed -i 's/FROM node:18-alpine/FROM node:20-alpine/g' Dockerfile
cat Dockerfile | grep "FROM node"

echo "Step 2: Stopping old container..."
docker compose down

echo "Step 3: Building new container with Node 20..."
docker compose build --no-cache

echo "Step 4: Starting new container..."
docker compose up -d

echo "Step 5: Waiting for container..."
sleep 10

echo "Step 6: Checking status..."
docker compose ps

echo "Step 7: Recent logs..."
docker compose logs --tail=20

echo "Done! Testing..."
curl -s http://localhost:3000 | head -5

