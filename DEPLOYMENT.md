# Deployment Guide - RepairHub

## Prerequisites

- Docker and Docker Compose installed
- Node.js 20+ (for local development)
- Git

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/PlevanDM/RP-Modern.git
cd RP-Modern
```

### 2. Environment Configuration

Create `.env` file (use `.env.example` as template):

```bash
cp .env.example .env
# Edit .env with your production values
```

**Important**: Change `JWT_SECRET` to a strong random string in production!

### 3. Build and Run with Docker

```bash
# Build and start containers
docker-compose up -d --build

# Check logs
docker-compose logs -f

# Check status
docker-compose ps
```

### 4. Access Application

- Frontend: http://localhost:80
- Backend API: http://localhost:3001 (if backend server is running)

## Production Deployment

### Using Docker Compose

1. **Configure Environment Variables**
   ```bash
   export NODE_ENV=production
   # Set other environment variables as needed
   ```

2. **Build Production Image**
   ```bash
   docker-compose -f docker-compose.yml build
   ```

3. **Start Services**
   ```bash
   docker-compose up -d
   ```

4. **Verify Deployment**
   ```bash
   curl http://localhost:80
   docker-compose logs repair-hub-pro
   ```

### Manual Build

```bash
# Build Docker image
docker build -t repair-hub-pro:latest .

# Run container
docker run -d \
  --name repair-hub-pro \
  -p 80:80 \
  --restart unless-stopped \
  repair-hub-pro:latest
```

## Architecture

### Frontend
- **Build Tool**: Vite
- **Framework**: React 18
- **UI Library**: Material-UI, Radix UI
- **State Management**: Zustand
- **Deployment**: Static files served by Nginx

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express
- **Database**: JSON-based (LowDB) - can be migrated to PostgreSQL
- **Port**: 3001

### Reverse Proxy
- **Server**: Nginx (Alpine)
- **Port**: 80
- **Static Files**: `/app/dist`
- **API Proxy**: `/api` → Backend on port 3001

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `VITE_API_URL` | Backend API URL | `http://localhost:3001` |
| `JWT_SECRET` | JWT signing secret | **REQUIRED** |
| `PORT` | Backend port | `3001` |

## Health Check

The container includes a health check:

```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' repair-hub-pro

# Health check endpoint
curl http://localhost:80
```

## Logs

```bash
# View logs
docker-compose logs -f repair-hub-pro

# View nginx logs
docker-compose exec repair-hub-pro tail -f /var/log/nginx/access.log
```

## Troubleshooting

### Container won't start
```bash
docker-compose logs repair-hub-pro
docker-compose ps
```

### Port already in use
Change port in `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Use port 8080 instead
```

### Build fails
```bash
# Clean build
docker-compose down
docker system prune -f
docker-compose build --no-cache
```

### Backend not accessible
Ensure backend server is running on port 3001, or update `nginx.conf` to point to correct backend URL.

## Updates

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

## Security Notes

1. **Never commit `.env` file** - it contains sensitive data
2. **Change default JWT_SECRET** in production
3. **Use HTTPS** in production (configure SSL in nginx.conf)
4. **Limit CORS origins** in production (update nginx.conf)
5. **Keep dependencies updated**: `npm audit fix`

## Production Checklist

- [ ] Change JWT_SECRET
- [ ] Configure proper API URL
- [ ] Set up SSL/HTTPS
- [ ] Configure CORS properly
- [ ] Set up monitoring/logging
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Configure domain and DNS
- [ ] Set up firewall rules
- [ ] Review security settings

