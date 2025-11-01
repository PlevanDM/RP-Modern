# 🔒 Security Policy - RP-Modern Platform

## Table of Contents
1. [Authentication & Authorization](#authentication--authorization)
2. [Data Protection](#data-protection)
3. [API Security](#api-security)
4. [Environment Configuration](#environment-configuration)
5. [Incident Response](#incident-response)

---

## Authentication & Authorization

### JWT Tokens
- **Algorithm**: HS256 (HMAC with SHA-256)
- **Expiry**: 7 days (configurable via `JWT_EXPIRY`)
- **Secret**: Must be minimum 32 characters in production
- **Claims**:
  ```json
  {
    "userId": "user-123",
    "role": "client|master|admin|superadmin",
    "email": "user@example.com",
    "iat": 1234567890,
    "exp": 1234654290
  }
  ```

### Password Security
- **Hashing Algorithm**: bcryptjs (10 salt rounds)
- **Password Requirements**:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - Recommended: one special character

### Role-Based Access Control (RBAC)
```
- client: Create orders, view proposals, manage payments
- master: Browse orders, submit proposals, manage work
- admin: Manage users, view statistics, handle disputes
- superadmin: Full platform access, system configuration
```

---

## Data Protection

### Sensitive Data Encryption
- **Email & Phone**: Should be encrypted in production
- **Payment Info**: PCI-DSS compliance required
- **User Passwords**: Never stored in plain text

### Database Security
- **Type**: Low DB (JSON file-based - development only)
- **Production Migration**: Use PostgreSQL/MongoDB with:
  - Encryption at rest
  - TLS encryption in transit
  - Automated backups
  - Access control lists

### CORS Configuration
```typescript
// Allowed Origins (from .env)
CORS_ORIGIN=http://localhost:5173

// Production Example:
CORS_ORIGIN=https://repairhub.pro,https://app.repairhub.pro
```

---

## API Security

### Rate Limiting
```typescript
// Applied to all endpoints
- Window: 15 minutes
- Max Requests: 100 per IP
- Exceptions: Health checks (/health)
```

### Security Headers (Helmet.js)
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
```

### Input Validation
- **Email**: RFC 5322 compliant, max 255 chars
- **Password**: See Password Security section
- **Text Inputs**: Max 1000 chars, HTML sanitized
- **Numbers**: Type checked, range validated

### Endpoint Protection
```typescript
// All endpoints require authentication (except login/register)
app.get('/api/protected', authMiddleware, (req, res) => {
  // Request verified and user attached
});

// Role-based endpoints
app.patch('/api/admin/users/:id', 
  authMiddleware, 
  requireRole(['admin', 'superadmin']),
  (req, res) => {
    // Only admins allowed
  }
);
```

---

## Environment Configuration

### Required Environment Variables

#### Production (.env)
```bash
# CRITICAL - Generate strong secret:
# openssl rand -base64 32
JWT_SECRET=your_base64_encoded_secret_here

# Server
NODE_ENV=production
API_PORT=3001

# CORS
CORS_ORIGIN=https://repairhub.pro

# Database (use production DB)
DATABASE_TYPE=postgresql
DATABASE_URL=postgresql://user:pass@host/dbname

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Development (.env.local)
```bash
JWT_SECRET=dev-key-can-be-simple
NODE_ENV=development
API_PORT=3001
CORS_ORIGIN=http://localhost:5173
```

### .env File Security
- ✅ `.env` and `.env.local` files are in `.gitignore`
- ✅ Never commit sensitive environment variables
- ✅ Use `.env.example` as template only
- ✅ Each developer has their own `.env.local`

---

## Security Best Practices

### Frontend Security
1. **HTTPS Only** in production
2. **Secure Cookies**:
   ```typescript
   httpOnly: true
   secure: true (HTTPS only)
   sameSite: 'strict'
   ```

3. **Content Security Policy** headers
4. **XSS Protection**: Angular/React automatically escapes
5. **CSRF Tokens**: Implement for state-changing operations

### Backend Security
1. **Input Validation**: Always validate and sanitize
2. **SQL Injection**: Use parameterized queries
3. **File Upload**: Validate file type and size
4. **Error Handling**: Don't expose sensitive info in errors
5. **Logging**: Audit log all critical operations

### Database Security
1. **Backups**: Automated daily backups encrypted
2. **Access Control**: Separate read-only and write users
3. **Network**: Database accessible only from app server
4. **Monitoring**: Alert on unusual access patterns

---

## Incident Response

### Security Incident Procedure
1. **Identify**: Detect unusual activity via:
   - Error logs
   - Rate limit warnings
   - Failed auth attempts
   - Audit logs

2. **Isolate**: Temporarily:
   - Block suspicious IPs
   - Disable affected user accounts
   - Rotate compromised secrets

3. **Analyze**: Determine:
   - What data was accessed
   - How it happened
   - How long it lasted

4. **Remediate**:
   - Fix the vulnerability
   - Update security patches
   - Rotate all secrets
   - Notify affected users

5. **Monitor**: Enhanced monitoring for 30 days

### Reporting Security Issues
**DO NOT** open public GitHub issues for security vulnerabilities
- Email: security@repairhub.pro
- Include: Description, reproduction steps, potential impact
- Response time: 48 hours

---

## Compliance & Standards

### GDPR Compliance
- [ ] User consent for data collection
- [ ] Data deletion requests (right to be forgotten)
- [ ] Data export functionality
- [ ] Privacy policy

### Payment Security (PCI-DSS)
- [ ] Never store full credit card numbers
- [ ] Use payment gateway (Stripe, PayPal)
- [ ] Encrypt payment data in transit

### Regular Audits
- [ ] Monthly: Review access logs
- [ ] Quarterly: Security code review
- [ ] Annually: External penetration testing
- [ ] Per incident: Post-mortem analysis

---

## Quick Security Checklist

### Before Deployment to Production
- [ ] JWT_SECRET is strong (32+ characters)
- [ ] CORS_ORIGIN restricted to your domain only
- [ ] NODE_ENV=production
- [ ] HTTPS enabled
- [ ] Database backed up
- [ ] All dependencies updated (`npm audit`)
- [ ] Secrets not in any files
- [ ] Rate limiting enabled
- [ ] Security headers enabled
- [ ] Error logging configured

### Weekly
- [ ] Review error logs
- [ ] Check failed auth attempts
- [ ] Monitor rate limit violations

### Monthly
- [ ] Update dependencies
- [ ] Review user permissions
- [ ] Audit admin actions
- [ ] Test backup restoration

---

**Last Updated**: November 2025
**Status**: ⚠️ Development Phase - Not Production Ready
**Next Steps**: 
- [ ] Implement password encryption
- [ ] Add two-factor authentication
- [ ] Setup automated security scanning
- [ ] Configure centralized logging
- [ ] Implement DDoS protection
