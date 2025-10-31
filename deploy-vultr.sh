#!/bin/bash
# Deployment script for Vultr VPS
# RepairHub Pro - Production Deployment

set -e

echo "🚀 Starting RepairHub Pro deployment on Vultr..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

# Update system
echo -e "${YELLOW}📦 Updating system packages...${NC}"
apt-get update -y
apt-get upgrade -y

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}🐳 Installing Docker...${NC}"
    apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt-get update -y
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    systemctl enable docker
    systemctl start docker
fi

# Install Docker Compose if not installed
if ! command -v docker compose &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Docker Compose...${NC}"
    apt-get install -y docker-compose-plugin
fi

# Install Git if not installed
if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}📥 Installing Git...${NC}"
    apt-get install -y git
fi

# Set up firewall
echo -e "${YELLOW}🔥 Configuring firewall...${NC}"
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp  # HTTPS
ufw --force enable

# Create application directory
APP_DIR="/opt/repairhub-pro"
mkdir -p $APP_DIR
cd $APP_DIR

# Clone or update repository
if [ -d ".git" ]; then
    echo -e "${YELLOW}🔄 Updating repository...${NC}"
    git pull origin pdate5 || git pull origin main
else
    echo -e "${YELLOW}📥 Cloning repository...${NC}"
    git clone -b pdate5 https://github.com/PlevanDM/RP-Modern.git .
fi

# Create .env file if not exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}📝 Creating .env file...${NC}"
    cp .env.example .env
    
    # Generate random JWT secret
    JWT_SECRET=$(openssl rand -base64 32)
    sed -i "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env
    
    echo -e "${GREEN}✅ .env file created. Please edit it with your production values!${NC}"
fi

# Build and start containers
echo -e "${YELLOW}🏗️ Building Docker image...${NC}"
docker compose build --no-cache

echo -e "${YELLOW}🚀 Starting containers...${NC}"
docker compose up -d

# Wait for containers to be healthy
echo -e "${YELLOW}⏳ Waiting for application to be ready...${NC}"
sleep 10

# Check container status
if docker compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ Application deployed successfully!${NC}"
    echo ""
    echo "📊 Container status:"
    docker compose ps
    echo ""
    echo "📋 Application logs:"
    docker compose logs --tail=50
    echo ""
    echo -e "${GREEN}🌐 Application should be available at: http://$(hostname -I | awk '{print $1}')${NC}"
else
    echo -e "${RED}❌ Deployment failed. Check logs:${NC}"
    docker compose logs
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Useful commands:"
echo "  docker compose logs -f     # View logs"
echo "  docker compose ps           # Check status"
echo "  docker compose restart      # Restart services"
echo "  docker compose down         # Stop services"

