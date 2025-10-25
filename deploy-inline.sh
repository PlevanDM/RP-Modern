cat > /root/deploy.sh << 'EOF'
#!/bin/bash
set -e
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SERVER_IP="64.176.72.139"
APP_NAME="repairhub"
APP_PORT="3000"
APP_DIR="/root/repairhub"
REPO_URL="https://github.com/PlevanDM/RP-Modern.git"
BRANCH="24.10v3"

log_info() { echo -e "${BLUE}[INFO] $1${NC}"; }
log_success() { echo -e "${GREEN}[OK] $1${NC}"; }

echo "=================================="
echo "RepairHub Pro - Vultr Deploy"
echo "=================================="

log_info "Updating system..."
apt update -y && apt upgrade -y

log_info "Installing packages..."
apt install -y curl git build-essential ufw

if ! command -v node &> /dev/null; then
    log_info "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

if ! command -v pm2 &> /dev/null; then
    log_info "Installing PM2..."
    npm install -g pm2
fi

cd /root
if [ -d "$APP_DIR" ]; then
    cd $APP_DIR
    git fetch origin
    git reset --hard origin/$BRANCH
else
    git clone -b $BRANCH $REPO_URL $APP_DIR
    cd $APP_DIR
fi

log_info "Installing dependencies..."
npm install

log_info "Building project..."
npm run build

log_info "Configuring PM2..."
pm2 delete $APP_NAME 2>/dev/null || true
pm2 start npm --name $APP_NAME -- start -- --host 0.0.0.0 --port $APP_PORT
pm2 save
pm2 startup systemd -u root --hp /root || true

ufw allow $APP_PORT/tcp || true
ufw allow 22/tcp || true

echo ""
log_success "Deployment completed!"
echo "Application: http://$SERVER_IP:$APP_PORT"
pm2 status
EOF

chmod +x /root/deploy.sh
/root/deploy.sh
