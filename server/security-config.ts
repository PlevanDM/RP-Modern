import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

// JWT Secret
export const JWT_SECRET = process.env.JWT_SECRET || (() => {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ CRITICAL: JWT_SECRET must be set in production');
    process.exit(1);
  }
  console.warn('⚠️ Using development JWT_SECRET');
  return 'dev-temporary-key-not-for-production-' + Date.now();
})();

// CORS Origins
export const CORS_ORIGINS = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim());

// Port
export const PORT = parseInt(process.env.API_PORT || '3001');

// Environment
export const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('🔒 Security Configuration Loaded:');
console.log(`   Environment: ${NODE_ENV}`);
console.log(`   CORS Origins: ${CORS_ORIGINS.join(', ')}`);
console.log(`   JWT Expiry: ${process.env.JWT_EXPIRY || '7d'}`);
