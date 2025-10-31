# Deployment Guide for Vultr VPS

## Prerequisites

- Vultr VPS instance (Ubuntu 20.04+ recommended)
- SSH access to your VPS
- Domain name (optional, for production)

## Quick Deployment

### Option 1: Automated Script (Recommended)

1. **Connect to your Vultr VPS:**
   ```bash
   ssh root@your-vultr-ip
   ```

2. **Download and run deployment script:**
   ```bash
   wget https://raw.githubusercontent.com/PlevanDM/RP-Modern/pdate5/deploy-vultr.sh
   chmod +x deploy-vultr.sh
   sudo ./deploy-vultr.sh
   ```

   Or clone repository first:
   ```bash
   git clone -b pdate5 https://github.com/PlevanDM/RP-Modern.git
   cd RP-Modern
   chmod +x deploy-vultr.sh
   sudo ./deploy-vultr.sh
   ```

### Option 2: Manual Deployment

1. **Update system:**
   ```bash
   sudo apt-get update && sudo apt-get upgrade -y
   ```

2. **Install Docker:**
   ```bash
   sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt-get update
   sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

3. **Configure firewall:**
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw --force enable
   ```

4. **Clone repository:**
   ```bash
   cd /opt
   sudo git clone -b pdate5 https://github.com/PlevanDM/RP-Modern.git repairhub-pro
   cd repairhub-pro
   ```

5. **Configure environment:**
   ```bash
   sudo cp .env.example .env
   sudo nano .env  # Edit with your production values
   ```

6. **Build and start:**
   ```bash
   sudo docker compose build
   sudo docker compose up -d
   ```

7. **Check status:**
   ```bash
   sudo docker compose ps
   sudo docker compose logs -f
   ```

## Configuration

### Environment Variables

Edit `.env` file with your production values:

```bash
sudo nano /opt/repairhub-pro/.env
```

**Important variables:**
- `JWT_SECRET` - Strong random string (use `openssl rand -base64 32`)
- `VITE_API_URL` - Your backend API URL
- `NODE_ENV=production`

### Firewall

The deployment script automatically configures UFW:
- Port 22 (SSH)
- Port 80 (HTTP)
- Port 443 (HTTPS)

### SSL/HTTPS Setup (Optional)

For production, set up SSL with Let's Encrypt:

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

Then update `nginx.conf` to use HTTPS.

## Management Commands

### View Logs
```bash
cd /opt/repairhub-pro
sudo docker compose logs -f
```

### Restart Services
```bash
sudo docker compose restart
```

### Stop Services
```bash
sudo docker compose down
```

### Update Application
```bash
cd /opt/repairhub-pro
sudo git pull origin pdate5
sudo docker compose build
sudo docker compose up -d
```

### Check Status
```bash
sudo docker compose ps
curl http://localhost:80
```

## Troubleshooting

### Container won't start
```bash
sudo docker compose logs
sudo docker compose ps
```

### Port already in use
```bash
sudo netstat -tulpn | grep :80
sudo docker compose down
sudo docker compose up -d
```

### Out of memory
- Upgrade Vultr instance (minimum 2GB RAM recommended)
- Check with: `free -h`

### Cannot access application
1. Check firewall: `sudo ufw status`
2. Check container: `sudo docker compose ps`
3. Check logs: `sudo docker compose logs`
4. Check nginx: `curl http://localhost:80`

## System Requirements

- **Minimum:**
  - 1 CPU core
  - 1GB RAM
  - 10GB storage

- **Recommended:**
  - 2 CPU cores
  - 2GB RAM
  - 20GB storage

## Security Checklist

- [ ] Change default JWT_SECRET
- [ ] Configure firewall (ports 22, 80, 443)
- [ ] Set up SSL/HTTPS
- [ ] Regular system updates
- [ ] Backup database regularly
- [ ] Use strong SSH keys
- [ ] Disable root login (optional)

## Monitoring

### Health Check
The container includes health checks:
```bash
sudo docker inspect repair-hub-pro | grep -A 5 Health
```

### Resource Usage
```bash
sudo docker stats
htop  # if installed
```

## Backup

### Application Data
```bash
# Backup database (if using external DB)
sudo docker compose exec repair-hub-pro cat /app/dist > backup.tar.gz
```

### Full Backup
```bash
cd /opt
sudo tar -czf repairhub-backup-$(date +%Y%m%d).tar.gz repairhub-pro/
```

## Support

For issues:
1. Check logs: `sudo docker compose logs`
2. Check GitHub Issues: https://github.com/PlevanDM/RP-Modern/issues
3. Review DEPLOYMENT.md for general deployment info

