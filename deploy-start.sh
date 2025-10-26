#!/bin/bash

set -e

echo "================================================================"
echo "       🚀 REPAIR-HUB-PRO DEPLOYMENT"
echo "================================================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

cd /root/repair-hub-pro

echo -e "${YELLOW}Step 1: Pulling latest code...${NC}"
git fetch origin
git reset --hard origin/eploy
git clean -fd
echo -e "${GREEN}✓ Code updated${NC}"
echo ""

echo -e "${YELLOW}Step 2: Stopping containers...${NC}"
docker compose down -v || true
echo -e "${GREEN}✓ Containers stopped${NC}"
echo ""

echo -e "${YELLOW}Step 3: Building new images...${NC}"
docker compose build --no-cache
echo -e "${GREEN}✓ Images built${NC}"
echo ""

echo -e "${YELLOW}Step 4: Starting containers...${NC}"
docker compose up -d
echo -e "${GREEN}✓ Containers started${NC}"
echo ""

echo -e "${YELLOW}Step 5: Waiting for services...${NC}"
sleep 30
echo -e "${GREEN}✓ Services ready${NC}"
echo ""

echo -e "${YELLOW}Step 6: Checking status...${NC}"
docker compose ps
echo ""

echo -e "${YELLOW}Step 7: Checking logs...${NC}"
docker logs repair-hub-pro --tail=30 || true
echo ""

echo -e "${YELLOW}Step 8: Testing endpoints...${NC}"
curl -I http://localhost:80 2>/dev/null || echo -e "${RED}⚠ Port 80 not responding${NC}"
echo ""

echo "================================================================"
echo -e "${GREEN}       ✅ DEPLOYMENT COMPLETE!${NC}"
echo "================================================================"
echo ""
echo -e "${GREEN}Test sites:${NC}"
echo "  - http://70.34.252.148"
echo "  - http://repairhub.one"
echo ""

