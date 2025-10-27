#!/bin/bash

# Simple Vultr Startup Script - ASCII only
# No special characters, Latin 1 compatible

echo "Starting RepairHub Pro deployment..."
echo "==================================="

# Update system
apt update
apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Enable Docker
systemctl enable docker
systemctl start docker

# Create directory
mkdir -p /opt/repairhub
cd /opt/repairhub

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  app:
    build: .
    ports:
      - "80:80"
    restart: always
    container_name: repairhub
EOF

# Create Dockerfile
cat > Dockerfile << 'EOF'
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

# Create nginx.conf
cat > nginx.conf << 'EOF'
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

# Create package.json
cat > package.json << 'EOF'
{
  "name": "repairhub",
  "version": "1.0.0",
  "scripts": {
    "build": "echo 'Build complete'"
  }
}
EOF

# Create index.html
mkdir -p dist
cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>RepairHub Pro</title>
    <meta charset="utf-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            text-align: center;
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        h1 {
            color: #333;
            margin-bottom: 1rem;
        }
        .status {
            color: #28a745;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>RepairHub Pro</h1>
        <p class="status">Successfully deployed on Vultr!</p>
        <p>Server IP: <span id="ip"></span></p>
        <p>Time: <span id="time"></span></p>
    </div>

    <script>
        document.getElementById('ip').textContent = window.location.hostname;
        document.getElementById('time').textContent = new Date().toLocaleString();
    </script>
</body>
</html>
EOF

# Wait for Docker
sleep 10

# Build and run
docker-compose up -d --build

echo ""
echo "Deployment successful!"
echo "Access at: http://$(hostname -I | awk '{print $1}')"
echo ""
echo "Status:"
docker-compose ps
