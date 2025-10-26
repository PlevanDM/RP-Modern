#!/bin/bash
echo "=== Updating RepairHub to Node.js 20 ==="
cd /root/repair-hub-pro
docker compose down
docker compose build --no-cache --build-arg NODE_VERSION=20
docker compose up -d
sleep 10
docker compose ps
docker compose logs --tail=30

