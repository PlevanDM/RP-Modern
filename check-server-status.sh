#!/bin/bash

echo "==================================================================="
echo "           CHECKING SERVER STATUS"
echo "==================================================================="
echo ""

echo "1. Checking Docker containers..."
docker compose ps

echo ""
echo "2. Checking logs..."
docker logs repair-hub-pro --tail=50

echo ""
echo "3. Checking ports..."
netstat -tlnp | grep :80
netstat -tlnp | grep :3000

echo ""
echo "4. Checking files..."
ls -la /root/repair-hub-pro/dist/ 2>/dev/null

echo ""
echo "5. Checking Nginx config..."
cat /root/repair-hub-pro/nginx.conf | grep -E "listen|server_name"

echo ""
echo "==================================================================="

