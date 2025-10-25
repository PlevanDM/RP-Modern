#!/bin/bash

################################################################################
# RepairHub Pro - Vultr Deploy Script
################################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Server information
SERVER_IP="64.176.72.139"
APP_NAME="repairhub"
APP_PORT="3000"
APP_DIR="/root/repairhub"
REPO_URL="https://github.com/PlevanDM/RP-Modern.git"
BRANCH="24.10v3"

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

log_success() {
    echo -e "${GREEN}[OK] $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}[WARN] $1${NC}"
}

log_error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

# Header
echo ""
echo "=================================================================="
echo -e "${GREEN}RepairHub Pro - Vultr Deploy${NC}"
echo "=================================================================="
echo ""

################################################################################
# Step 1: Update system
################################################################################

log_info "Updating system..."
apt update -y
apt upgrade -y
log_success "System updated"

################################################################################
# Step 2: Install basic packages
################################################################################

log_info "Installing required packages..."
apt install -y curl git build-essential ufw
log_success "Packages installed"

################################################################################
# Step 3: Install Node.js
################################################################################

if ! command -v node &> /dev/null; then
    log_info "Installing Node.js 20.x..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
    log_success "Node.js installed"
else
    log_info "Node.js already installed: $(node --version)"
fi

################################################################################
# Step 4: Install PM2
################################################################################

if ! command -v pm2 &> /dev/null; then
    log_info "Installing PM2..."
    npm install -g pm2
    log_success "PM2 installed"
else
    log_info "PM2 already installed"
fi

################################################################################
# Step 5: Clone/update repository
################################################################################

cd /root

if [ -d "$APP_DIR" ]; then
    log_info "Updating repository..."
    cd $APP_DIR
    git fetch origin
    git reset --hard origin/$BRANCH
    log_success "Repository updated"
else
    log_info "Cloning repository..."
    git clone -b $BRANCH $REPO_URL $APP_DIR
    cd $APP_DIR
    log_success "Repository cloned"
fi

################################################################################
# Step 6: Install dependencies
################################################################################

log_info "Installing dependencies..."
npm install
log_success "Dependencies installed"

################################################################################
# Step 7: Build project
################################################################################

log_info "Building project..."
npm run build
log_success "Project built"

################################################################################
# Step 8: Setup PM2
################################################################################

log_info "Configuring PM2..."

# Stop old application
pm2 delete $APP_NAME 2>/dev/null || true

# Start new application
pm2 start npm --name $APP_NAME -- start -- --host 0.0.0.0 --port $APP_PORT

# Save configuration
pm2 save

# Setup autostart
pm2 startup systemd -u root --hp /root || true

log_success "PM2 configured"

################################################################################
# Step 9: Configure firewall
################################################################################

log_info "Configuring firewall..."
ufw allow $APP_PORT/tcp || true
ufw allow 22/tcp || true
log_success "Firewall configured"

################################################################################
# Step 10: Check status
################################################################################

echo ""
echo "=================================================================="
log_success "Deployment completed successfully!"
echo "=================================================================="
echo ""

log_info "Application status:"
pm2 status

echo ""
log_info "Application URL:"
echo -e "${GREEN}http://${SERVER_IP}:${APP_PORT}${NC}"
echo ""

log_info "Useful commands:"
echo "  pm2 logs $APP_NAME      # View logs"
echo "  pm2 restart $APP_NAME   # Restart"
echo "  pm2 stop $APP_NAME      # Stop"
echo ""

log_success "Done!"
