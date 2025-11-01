/**
 * Audit Logger - Logs all critical security events
 */

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  userId?: string;
  userRole?: string;
  resource: string;
  resourceId?: string;
  details: Record<string, unknown>;
  ipAddress?: string;
  status: 'success' | 'failure';
  changes?: Record<string, unknown>;
}

interface AuditDb {
  logs: AuditLog[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const auditFile = path.join(__dirname, 'audit.log.json');
const auditAdapter = new JSONFile<AuditDb>(auditFile);
const auditDb = new Low<AuditDb>(auditAdapter, { logs: [] });

let initialized = false;

export async function initAuditLogger() {
  if (initialized) return;
  await auditDb.read();
  if (!auditDb.data) {
    auditDb.data = { logs: [] };
    await auditDb.write();
  }
  initialized = true;
}

/**
 * Log security audit event
 */
export async function audit(log: Omit<AuditLog, 'id' | 'timestamp'>) {
  if (!initialized) {
    await initAuditLogger();
  }

  const entry: AuditLog = {
    id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    ...log
  };

  // Log to console for immediate visibility
  const severity = log.status === 'failure' ? '⚠️' : 'ℹ️';
  console.log(
    `${severity} [AUDIT] ${log.action} | User: ${log.userId || 'anonymous'} | Resource: ${log.resource} | Status: ${log.status}`
  );

  // Add to database
  await auditDb.read();
  if (!auditDb.data) auditDb.data = { logs: [] };

  auditDb.data.logs.push(entry);

  // Keep only last 10000 logs to prevent bloating
  if (auditDb.data.logs.length > 10000) {
    auditDb.data.logs = auditDb.data.logs.slice(-10000);
  }

  await auditDb.write();
  return entry;
}

/**
 * Log authentication events
 */
export async function auditAuth(
  action: 'login' | 'logout' | 'register' | 'token_refresh',
  userId: string | undefined,
  status: 'success' | 'failure',
  details: Record<string, unknown>,
  ip?: string
) {
  return audit({
    action: `auth.${action}`,
    userId,
    resource: 'authentication',
    details,
    ipAddress: ip,
    status
  });
}

/**
 * Log user modifications
 */
export async function auditUserChange(
  action: 'create' | 'update' | 'delete' | 'block' | 'unblock',
  targetUserId: string,
  performedBy: string,
  changes: Record<string, unknown>,
  status: 'success' | 'failure'
) {
  return audit({
    action: `user.${action}`,
    userId: performedBy,
    userRole: 'admin',
    resource: 'user',
    resourceId: targetUserId,
    details: { targetUserId },
    changes,
    status
  });
}

/**
 * Log payment events
 */
export async function auditPayment(
  action: 'create' | 'release' | 'refund' | 'freeze',
  paymentId: string,
  orderId: string,
  amount: number,
  userId: string,
  status: 'success' | 'failure'
) {
  return audit({
    action: `payment.${action}`,
    userId,
    resource: 'payment',
    resourceId: paymentId,
    details: { orderId, amount, paymentId },
    status
  });
}

/**
 * Log dispute events
 */
export async function auditDispute(
  action: 'create' | 'resolve' | 'update',
  disputeId: string,
  orderId: string,
  userId: string,
  status: 'success' | 'failure',
  details?: Record<string, unknown>
) {
  return audit({
    action: `dispute.${action}`,
    userId,
    resource: 'dispute',
    resourceId: disputeId,
    details: { orderId, disputeId, ...details },
    status
  });
}

/**
 * Get audit logs
 */
export async function getAuditLogs(
  filter?: {
    action?: string;
    userId?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }
) {
  if (!initialized) {
    await initAuditLogger();
  }

  await auditDb.read();
  let logs = auditDb.data?.logs || [];

  // Apply filters
  if (filter?.action) {
    logs = logs.filter(log => log.action.includes(filter.action!));
  }
  if (filter?.userId) {
    logs = logs.filter(log => log.userId === filter.userId);
  }
  if (filter?.startDate) {
    logs = logs.filter(log => new Date(log.timestamp) >= filter.startDate!);
  }
  if (filter?.endDate) {
    logs = logs.filter(log => new Date(log.timestamp) <= filter.endDate!);
  }

  // Sort by timestamp descending
  logs = logs.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Limit results
  return logs.slice(0, filter?.limit || 100);
}

export default {
  initAuditLogger,
  audit,
  auditAuth,
  auditUserChange,
  auditPayment,
  auditDispute,
  getAuditLogs
};
