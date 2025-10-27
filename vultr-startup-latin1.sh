#!/bin/bash

# RepairHub Pro - Vultr Startup Script (Latin1 compatible)
# This script runs automatically when the server is created

set -e

echo "Starting RepairHub Pro deployment..."

# Update system packages
echo "Updating system packages..."
apt update && apt upgrade -y

# Install Docker
echo "Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root

# Install Docker Compose
echo "Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Create project directory
echo "Creating project structure..."
mkdir -p /opt/repairhub-pro
cd /opt/repairhub-pro

# Create docker-compose.yml
cat > docker-compose.yml << 'COMPOSE_EOF'
services:
  repairhub-pro:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: always
    container_name: repairhub-pro
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:80"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - repair-network
    volumes:
      - ./nginx.conf:/etc/nginx/http.d/default.conf:ro
      - nginx-logs:/var/log/nginx

volumes:
  nginx-logs:
    driver: local

networks:
  repair-network:
    driver: bridge
COMPOSE_EOF

# Create Dockerfile
cat > Dockerfile << 'DOCKER_EOF'
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Install necessary packages
RUN apk add --no-cache wget curl

# Copy built application
COPY --from=build /app/dist /app/dist

# Copy nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Create directories
RUN mkdir -p /var/log/nginx /var/cache/nginx /etc/nginx/http.d /run/nginx

# Create startup script
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'echo "Starting RepairHub Pro..."' >> /start.sh && \
    echo 'nginx -t || exit 1' >> /start.sh && \
    echo 'nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

CMD ["/start.sh"]
DOCKER_EOF

# Create nginx configuration
cat > nginx.conf << 'NGINX_EOF'
server {
    listen 80;
    server_name repairhub.one www.repairhub.one;
    root /app/dist;
    index index.html;

    # Logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log warn;

    # Disable caching for HTML files
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
        expires -1;
        try_files $uri /index.html;
    }

    # Cache static assets with long expiry
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary "Accept-Encoding";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Content Security Policy
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:*;" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript;

    # Error pages
    error_page 404 /index.html;
}
NGINX_EOF

# Create package.json with all dependencies
cat > package.json << 'PACKAGE_EOF'
{
  "name": "repair-hub-pro",
  "version": "1.0.0",
  "description": "Professional Repair Management Platform",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "serve": "vite preview --host 0.0.0.0 --port 3000"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-tabs": "^1.1.13",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.294.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^3.3.1",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.4",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.53.0",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.2.2",
    "vite": "^7.1.11"
  }
}
PACKAGE_EOF

# Start Docker service
echo "Starting Docker service..."
systemctl enable docker
systemctl start docker

# Wait for Docker to be ready
echo "Waiting for Docker to start..."
sleep 15

# Build and start the application
echo "Building and starting RepairHub Pro..."
docker-compose up -d --build

# Display status
echo "Deployment completed!"
echo "Application status:"
docker-compose ps

echo "Application should be available at: http://$(curl -s ifconfig.me)"
echo "Check status: docker-compose ps"
echo "View logs: docker-compose logs -f"

