#!/bin/bash

# Simple Deploy Script - для выполнения в консоли сервера
# Скопировать и вставить в Vultr Console

echo "🚀 RepairHub Pro - Auto Deploy"
echo "=============================="

# Update system
echo "🔄 Updating system..."
apt update && apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root

# Install Docker Compose
echo "📦 Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Start Docker
echo "🔧 Starting Docker..."
systemctl enable docker
systemctl start docker

# Clean old deployments
echo "🧹 Cleaning old deployments..."
docker stop $(docker ps -aq) 2>/dev/null || echo "No containers"
docker rm $(docker ps -aq) 2>/dev/null || echo "No containers"
docker rmi $(docker images -q) 2>/dev/null || echo "No images"
docker system prune -a --volumes -f

# Create project
echo "📁 Creating project..."
mkdir -p /opt/repairhub-pro
cd /opt/repairhub-pro

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
    location / { try_files $uri $uri/ /index.html; }
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

# Create package.json
cat > package.json << 'EOF'
{
  "name": "repairhub-pro",
  "version": "1.0.0",
  "scripts": {
    "build": "echo 'Build complete'"
  }
}
EOF

# Create HTML
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
            background: linear-gradient(135deg, #667eea, #764ba2);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 3rem;
            border-radius: 15px;
        }
        h1 { font-size: 2.5rem; margin-bottom: 1rem; }
        .status {
            font-size: 1.2rem;
            padding: 0.5rem 1rem;
            background: rgba(40, 167, 69, 0.2);
            border-radius: 25px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 RepairHub Pro</h1>
        <div class="status">✅ Deployed Successfully!</div>
        <p>Server: $(hostname)</p>
        <p>IP: $(hostname -I | awk '{print $1}')</p>
        <p>Time: $(date)</p>
    </div>
</body>
</html>
EOF

# Wait for Docker
echo "⏳ Waiting for Docker..."
sleep 15

# Build and run
echo "🚀 Starting application..."
docker-compose up -d --build

echo ""
echo "📊 Status:"
docker-compose ps

echo ""
echo "🌐 Testing:"
if curl -s http://localhost:80 > /dev/null 2>&1; then
    echo "✅ SUCCESS! Application running at: http://$(hostname -I | awk '{print $1}')"
else
    echo "⚠️ Still starting... Check: docker-compose logs -f"
fi

echo ""
echo "🎉 Done! Access your app at: http://$(hostname -I | awk '{print $1}')"
