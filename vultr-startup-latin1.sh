#!/bin/bash

# Vultr Startup Script - RepairHub Pro
# ASCII only - Latin 1 encoding

echo "RepairHub Pro Deployment Started"
echo "================================="

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker root

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Enable and start Docker
systemctl enable docker
systemctl start docker

# Create project directory
mkdir -p /opt/repairhub-pro
cd /opt/repairhub-pro

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
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
EOF

# Create Dockerfile
cat > Dockerfile << 'EOF'
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci && npm run build

FROM nginx:alpine

RUN apk add --no-cache wget curl

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/http.d/default.conf

RUN mkdir -p /var/log/nginx /var/cache/nginx /etc/nginx/http.d /run/nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]
EOF

# Create nginx.conf
cat > nginx.conf << 'EOF'
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log warn;

    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
        expires -1;
        try_files $uri /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Vary "Accept-Encoding";
    }

    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:*;" always;

    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript;

    error_page 404 /index.html;
}
EOF

# Create package.json
cat > package.json << 'EOF'
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
    "tailwindcss": "^3.3.5",
    "typescript": "^5.2.2",
    "vite": "^7.1.11"
  }
}
EOF

# Create vite.config.ts
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    outDir: 'dist',
  },
})
EOF

# Create tailwind.config.js
cat > tailwind.config.js << 'EOF'
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
    },
  },
  plugins: [],
}
EOF

# Create project structure
mkdir -p src/components/pages src/components/ui src/components/layout src/store src/services src/types

# Create index.css
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 0 0% 83.1%;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
EOF

# Create main.tsx
cat > src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

# Create App.tsx (simplified for ASCII only)
cat > src/App.tsx << 'EOF'
import { useState } from 'react';
import { User, Wrench } from 'lucide-react';
import { Button } from './components/ui/button';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (userId) => {
    setCurrentUser(userId);
  };

  if (!currentUser) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: '48px', height: '48px', background: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wrench style={{ width: '28px', height: '28px', color: 'white' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', margin: 0 }}>Repair HUB</h1>
              <p style={{ color: '#93c5fd', fontSize: '1rem', margin: 0 }}>Pro</p>
            </div>
          </div>
          <p style={{ color: '#e5e7eb', fontSize: '1.25rem', marginBottom: '2rem' }}>
            Professional Repair Management Platform
          </p>
          <div style={{ display: 'grid', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
            <Button
              onClick={() => login('client1')}
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Login as Client
            </Button>
            <Button
              onClick={() => login('master1')}
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Login as Master
            </Button>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#9ca3af' }}>
            <span>Secure Platform</span>
            <span>•</span>
            <span>Quality Guaranteed</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '1rem' }}>
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar */}
        <div style={{
          width: '224px',
          background: 'white',
          borderRadius: '8px',
          padding: '1rem',
          marginRight: '1rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', background: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wrench style={{ width: '20px', height: '20px', color: 'white' }} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>Repair HUB</h2>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>Pro</p>
              </div>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {[
              { label: 'Dashboard', icon: '📊', active: true },
              { label: 'Orders', icon: '📋' },
              { label: 'Messages', icon: '💬' },
              { label: 'Profile', icon: '👤' },
              { label: 'Settings', icon: '⚙️' }
            ].map((item) => (
              <button
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: item.active ? '#3b82f6' : 'transparent',
                  color: item.active ? 'white' : '#374151',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <button
              onClick={() => setCurrentUser(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '6px',
                border: 'none',
                background: 'transparent',
                color: '#6b7280',
                cursor: 'pointer',
                fontSize: '0.875rem',
                width: '100%'
              }}
            >
              <span>🚪</span>
              Logout
            </button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, background: 'white', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>
              Welcome to RepairHub Pro!
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>14:30</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase' }}>Today</div>
              </div>
            </div>
          </div>

          <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
              Successfully Logged In!
            </h2>
            <p style={{ fontSize: '1rem', marginBottom: '2rem' }}>
              You are logged in as: <strong>{currentUser}</strong>
            </p>
            <div style={{
              padding: '1rem',
              background: '#f3f4f6',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                This is a simplified demo. Full functionality will be available after deployment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
EOF

# Wait for Docker to start
sleep 20

# Build and start the application
docker-compose up -d --build

echo ""
echo "Deployment completed successfully!"
echo "Application available at: http://$(hostname -I | awk '{print $1}')"
echo ""
echo "Status:"
docker-compose ps
echo ""
echo "Logs:"
docker-compose logs --tail=5

echo ""
echo "RepairHub Pro is ready!"
echo "Management: docker-compose restart/up/down/logs"