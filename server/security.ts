import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

/**
 * Safe JWT Secret retrieval from environment
 */
export const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    console.error('❌ CRITICAL SECURITY ERROR: JWT_SECRET not found in environment variables!');
    console.error('   Please set JWT_SECRET in .env.local or .env file');
    console.error('   Generate a strong secret key and keep it secure');
    
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    
    console.warn('   Using temporary development key (NOT FOR PRODUCTION)');
    return 'dev-temporary-key-not-for-production-' + Date.now();
  }
  
  if (secret.length < 32 && process.env.NODE_ENV === 'production') {
    console.error('❌ JWT_SECRET is too short (minimum 32 characters for production)');
    process.exit(1);
  }
  
  return secret;
};

/**
 * Safe CORS configuration from environment
 */
export const getCorsOrigins = (): (string | RegExp)[] => {
  const corsEnv = process.env.CORS_ORIGIN || 'http://localhost:5173';
  return corsEnv.split(',').map(origin => origin.trim());
};

/**
 * Rate limiting for API endpoints
 */
export const createRateLimiter = (windowMs = 15 * 60 * 1000, maxRequests = 100) => {
  return rateLimit({
    windowMs, // 15 minutes by default
    max: maxRequests, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    skip: (req) => {
      // Skip rate limiting for health checks
      return req.path === '/health';
    }
  });
};

/**
 * Strict CORS validator
 */
export const validateCorsOrigin = (origin: string | undefined): boolean => {
  if (!origin) return false; // Reject requests without origin
  
  const allowedOrigins = getCorsOrigins();
  return allowedOrigins.some(allowed => {
    if (typeof allowed === 'string') {
      return origin === allowed;
    }
    return allowed.test(origin);
  });
};

/**
 * Input validation and sanitization
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

export const validatePassword = (password: string): boolean => {
  // Minimum 8 characters, at least one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .substring(0, 1000) // Limit length
    .replace(/[<>\"']/g, ''); // Remove potentially dangerous characters
};

/**
 * Secure password validation
 */
export const validatePasswordStrength = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password should contain at least one special character (!@#$%^&*)');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export default {
  getJwtSecret,
  getCorsOrigins,
  createRateLimiter,
  validateCorsOrigin,
  validateEmail,
  validatePassword,
  sanitizeInput,
  validatePasswordStrength
};
