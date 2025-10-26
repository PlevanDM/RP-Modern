#!/bin/bash

# ============================================================================
# REPAIRHUB PRO - VULTR DEPLOYMENT SCRIPT
# ============================================================================
# This script automates the deployment of RepairHub Pro on Vultr servers
# ============================================================================

set -e

echo "Starting RepairHub Pro deployment on Vultr..."

# ============================================================================
# Configuration
# ============================================================================

GITHUB_REPO="https://github.com/PlevanDM/RP-Modern.git"
BRANCH="eploy"
APP_DIR="/root/repair-hub-pro"
DOCKER_COMPOSE_FILE="docker-compose.yml"
CONTAINER_NAME="repair-hub-pro"
HOST_PORT="3000"

# ============================================================================
# Color output functions
# ============================================================================

print_success() {
    echo -e "\033[0;32m[OK] $1\033[0m"
}

print_error() {
    echo -e "\033[0;31m[ERROR] $1\033[0m"
}

print_info() {
    echo -e "\033[0;34m[INFO] $1\033[0m"
}

print_warning() {
    echo -e "\033[0;33m[WARNING] $1\033[0m"
}

# ============================================================================
# Step 1: Update system and install prerequisites
# ============================================================================

print_info "Step 1: Updating system packages..."

export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get upgrade -y -qq

print_success "System updated successfully"

# ============================================================================
# Step 2: Install Docker
# ============================================================================

print_info "Step 2: Installing Docker..."

if ! command -v docker &> /dev/null; then
    print_info "Downloading and installing Docker..."
    
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    
    # Cleanup
    rm get-docker.sh
    
    print_success "Docker installed successfully"
else
    print_info "Docker is already installed"
fi

# ============================================================================
# Step 3: Install Docker Compose
# ============================================================================

print_info "Step 3: Installing Docker Compose..."

if ! command -v docker-compose &> /dev/null; then
    apt-get install -y docker-compose-plugin
    print_success "Docker Compose installed successfully"
else
    print_info "Docker Compose is already installed"
fi

# ============================================================================
# Step 4: Configure firewall (UFW)
# ============================================================================

print_info "Step 4: Configuring firewall..."

if command -v ufw &> /dev/null; then
    ufw allow $HOST_PORT/tcp
    print_success "Firewall configured successfully"
fi

# ============================================================================
# Step 5: Install Git
# ============================================================================

print_info "Step 5: Installing Git..."

apt-get install -y git

# ============================================================================
# Step 6: Clone or update repository
# ============================================================================

print_info "Step 6: Setting up project directory..."

if [ -d "$APP_DIR" ]; then
    print_info "Directory exists, updating repository..."
    cd "$APP_DIR"
    git fetch origin
    git checkout "$BRANCH"
    git pull origin "$BRANCH"
else
    print_info "Cloning repository..."
    git clone --branch "$BRANCH" "$GITHUB_REPO" "$APP_DIR"
    cd "$APP_DIR"
fi

print_success "Project directory ready"

# ============================================================================
# Step 7: Stop existing containers
# ============================================================================

print_info "Step 7: Stopping existing containers..."

if [ -f "$DOCKER_COMPOSE_FILE" ]; then
    docker compose down 2>/dev/null || true
fi

# Also stop container by name if it exists
docker stop "$CONTAINER_NAME" 2>/dev/null || true
docker rm "$CONTAINER_NAME" 2>/dev/null || true

print_success "Containers stopped successfully"

# ============================================================================
# Step 8: Build Docker image
# ============================================================================

print_info "Step 8: Building Docker image..."

docker compose build --no-cache

print_success "Docker image built successfully"

# ============================================================================
# Step 9: Start container
# ============================================================================

print_info "Step 9: Starting container..."

docker compose up -d

# Wait for container to be ready
sleep 5

# ============================================================================
# Step 10: Check container status
# ============================================================================

print_info "Step 10: Checking container status..."

if docker ps | grep -q "$CONTAINER_NAME"; then
    print_success "Container is running!"
else
    print_error "Container failed to start!"
    print_info "Checking logs..."
    docker compose logs
    exit 1
fi

# ============================================================================
# Step 11: Display status and URLs
# ============================================================================

echo ""
echo "============================================================================"
print_success "Deployment completed successfully!"
echo "============================================================================"
echo ""

# Get server IP
SERVER_IP=$(curl -s ifconfig.me || curl -s ipinfo.io/ip || echo "YOUR_SERVER_IP")

echo "Container Status:"
docker compose ps
echo ""

echo "Application URLs:"
echo "   - Local: http://localhost:$HOST_PORT"
echo "   - Network: http://$SERVER_IP:$HOST_PORT"
echo ""

echo "Useful Commands:"
echo "   - View logs: docker compose logs -f"
echo "   - Stop: docker compose down"
echo "   - Restart: docker compose restart"
echo "   - Remove: docker compose down -v"
echo ""

echo "Project Directory: $APP_DIR"
echo ""

echo "============================================================================"
print_success "RepairHub Pro is now running on Vultr!"
echo "============================================================================"
