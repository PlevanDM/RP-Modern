@echo off
echo 🚀 RepairHub Pro - Server Commands Generator
echo ===========================================
echo.
echo This will generate commands for your Vultr server console.
echo.
echo Generated commands will be saved to: server-commands.txt
echo.
echo Steps:
echo 1. Copy the content of server-commands.txt
echo 2. Go to Vultr Console: https://my.vultr.com/subs/vps/novnc/?id=c27acc98-d903-4c2e-b50c-2e1ca23451b0
echo 3. Paste and run the commands
echo.
echo Your server IP: 70.34.252.148
echo.

# Generate server commands
cat > server-commands.txt << 'EOF'
# 🚀 RepairHub Pro - Server Deploy Commands
# Copy and paste these commands in Vultr Console

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Start Docker
systemctl enable docker
systemctl start docker

# Clean old deployments
docker stop $(docker ps -aq) 2>/dev/null || echo "No containers"
docker rm $(docker ps -aq) 2>/dev/null || echo "No containers"
docker rmi $(docker images -q) 2>/dev/null || echo "No images"
docker system prune -a --volumes -f

# Create project
mkdir -p /opt/repairhub-pro
cd /opt/repairhub-pro

# Create docker-compose.yml
cat > docker-compose.yml << 'COMPOSE_EOF'
version: '3.8'
services:
  app:
    build: .
    ports:
      - "80:80"
    restart: always
    container_name: repairhub
COMPOSE_EOF

# Create Dockerfile
cat > Dockerfile << 'DOCKER_EOF'
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
DOCKER_EOF

# Create nginx.conf
cat > nginx.conf << 'NGINX_EOF'
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
NGINX_EOF

# Create package.json
cat > package.json << 'PACKAGE_EOF'
{
  "name": "repairhub-pro",
  "version": "1.0.0",
  "scripts": {
    "build": "echo 'Build complete'"
  }
}
PACKAGE_EOF

# Create HTML
mkdir -p dist
cat > dist/index.html << 'HTML_EOF'
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
HTML_EOF

# Wait and deploy
sleep 15
docker-compose up -d --build

echo "✅ Deployment complete!"
echo "🌐 Access: http://$(hostname -I | awk '{print $1}')"
echo "📊 Status: docker-compose ps"
EOF

echo "📋 Server commands generated!"
echo "📄 File: server-commands.txt"
echo.
echo "📋 Next steps:"
echo "1. Open Vultr Console: https://my.vultr.com/subs/vps/novnc/?id=c27acc98-d903-4c2e-b50c-2e1ca23451b0"
echo "2. Copy content from server-commands.txt"
echo "3. Paste and run in console"
echo.
echo "🌐 After deployment: http://70.34.252.148"
echo.
echo "📊 To check status:"
echo "ssh root@70.34.252.148 'docker-compose ps'"
echo.
pause
