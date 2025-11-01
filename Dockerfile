# Multi-stage build for RepairHub
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps --only=production=false

# Copy source code
COPY . .

# Build application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Install wget for healthcheck
RUN apk add --no-cache wget

# Copy nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Copy built application from builder
COPY --from=builder /app/dist /app/dist

# Create necessary nginx directories
RUN mkdir -p /var/log/nginx /var/cache/nginx /run/nginx && \
    chown -R nginx:nginx /app/dist /var/log/nginx /var/cache/nginx /run/nginx

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

