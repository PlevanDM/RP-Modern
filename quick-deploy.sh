#!/bin/bash
echo "Starting deployment..."
cd /root/repair-hub-pro
git pull origin eploy
docker compose down
docker compose build --no-cache
docker compose up -d
sleep 15
docker logs repair-hub-pro --tail=20
docker compose ps

