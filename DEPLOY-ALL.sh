#!/bin/bash
# Complete deployment script

ssh root@70.34.252.148 << 'DEPLOY'
cd /root/repair-hub-pro

echo "Pulling latest changes..."
git pull origin eploy

echo "Stopping Docker..."
docker compose down

echo "Building..."
docker compose build --no-cache

echo "Starting..."
docker compose up -d

echo "Waiting 30 seconds..."
sleep 30

echo "Checking status..."
docker compose ps
docker logs repair-hub-pro --tail=30

echo "Checking port 80..."
netstat -tulpn | grep :80

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Now add DNS records in Cloudflare:"
echo "1. https://dash.cloudflare.com → Zones → repairhub.one"
echo "2. DNS → Add record (twice)"
echo ""
echo "   Record 1:"
echo "   Type: A, Name: @, Content: 70.34.252.148, Proxy: OFF"
echo ""
echo "   Record 2:"
echo "   Type: A, Name: www, Content: 70.34.252.148, Proxy: OFF"
echo ""
echo "After that, wait 5-30 min and open:"
echo "  http://repairhub.one"
DEPLOY

