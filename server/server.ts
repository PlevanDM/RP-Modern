import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { User, Order, Offer, Dispute, Review } from '../src/types/models'; // Assuming all models are here
import { allDevicesDatabase } from './data/deviceDatabase.js';

// --- DATABASE SETUP ---
interface DbData {
  users: User[];
  orders: Order[];
  offers: Offer[];
  disputes: Dispute[];
  reviews: Review[];
  // Add other entities as needed
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile<DbData>(file);
const db = new Low<DbData>(adapter);

async function initializeDatabase() {
  await db.read();
  db.data = db.data || { users: [], orders: [], offers: [], disputes: [], reviews: [] };
  // Optionally seed data if empty
  await db.write();
  console.log('Database initialized.');
}

// --- EXPRESS APP SETUP ---
const app = express();
const port = 3001;
const JWT_SECRET = 'your_super_secret_key_change_in_production'; // Replace with env variable

app.use(cors());
app.use(express.json());

// --- AUTHENTICATION ---

// Register a new user
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name, city, specialization, role = 'client' } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Email, password, and name are required.' });
  }

  await db.read();
  const existingUser = db.data.users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'User with this email already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: `user-${Date.now()}`,
    email,
    password: hashedPassword,
    name,
    city: city || '',
    specialization: specialization || '',
    role,
    verified: false,
    blocked: false,
    balance: 0,
    rating: 0,
    skills: [],
    avatar: ''
    // Add other default fields from User type
  };

  db.data.users.push(newUser);
  await db.write();

  const token = jwt.sign({ userId: newUser.id, role: newUser.role, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });

  res.status(201).json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
});

// Login a user
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  await db.read();
  const user = db.data.users.find(u => u.email === email);

  if (!user || !user.password) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  if (user.blocked) {
      return res.status(403).json({ message: 'Your account has been blocked.' });
  }

  const token = jwt.sign({ userId: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});


// --- MIDDLEWARE ---

// Extend Express Request type to include user
interface AuthRequest extends Request {
  user?: User;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string; role: User['role']; iat: number; exp: number };

    await db.read();
    const user = db.data.users.find(u => u.id === payload.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    if (user.blocked) {
      return res.status(403).json({ message: 'User account is blocked.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

const requireRole = (roles: Array<User['role']>) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied. Required role: ${roles.join(' or ')}` });
    }
    next();
  };
};


// --- MIDDLEWARE to fetch and attach order to request ---
const getOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  await db.read();
  const order = db.data.orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found.' });
  }
  (req as any).order = order; // Attach order to request
  next();
};

const getOffer = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await db.read();
    const offer = db.data.offers.find(o => o.id === id);
    if (!offer) {
        return res.status(404).json({ message: 'Offer not found.' });
    }
    (req as any).offer = offer; // Attach offer to request
    next();
};


// --- OFFER MANAGEMENT API ---

// 1. Create an offer for an order
app.post('/api/offers', authMiddleware, requireRole(['master']), async (req: AuthRequest, res: Response) => {
    const { orderId, price, description, estimatedDays } = req.body;
    const master = req.user!;

    if (!orderId || !price || !description) {
        return res.status(400).json({ message: 'orderId, price, and description are required.' });
    }

    await db.read();
    const order = db.data.orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }
    if (order.status !== 'open') {
        return res.status(403).json({ message: 'You can only make offers on open orders.' });
    }

    const activeOffers = db.data.offers.filter(o => o.masterId === master.id && o.status === 'pending');
    if (activeOffers.length >= 5) {
        return res.status(403).json({ message: 'You have reached the maximum limit of 5 active offers.' });
    }

    const newOffer: Offer = {
        id: `offer-${Date.now()}`,
        orderId,
        masterId: master.id,
        masterName: master.name,
        masterRating: master.rating,
        price,
        description,
        estimatedDays: estimatedDays || 1,
        status: 'pending',
        createdAt: new Date(),
        masterAvatar: master.avatar
    };

    db.data.offers.push(newOffer);
    order.proposalCount = (order.proposalCount || 0) + 1; // Increment proposal count
    await db.write();

    res.status(201).json(newOffer);
});

// 2. Get all offers for a specific order
app.get('/api/offers', authMiddleware, async (req: AuthRequest, res: Response) => {
    const { orderId } = req.query;
    if (!orderId) {
        return res.status(400).json({ message: 'orderId query parameter is required.' });
    }

    await db.read();
    const order = db.data.orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }

    // Security check: Only client who owns the order or an admin can see offers
    if (req.user!.role !== 'admin' && req.user!.id !== order.clientId) {
        return res.status(403).json({ message: 'You are not authorized to view offers for this order.' });
    }

    const offers = db.data.offers.filter(o => o.orderId === orderId);
    res.json(offers);
});

// 3. Accept an offer
app.post('/api/offers/:id/accept', authMiddleware, requireRole(['client']), getOffer, async (req: AuthRequest, res: Response) => {
    const client = req.user!;
    const offerToAccept = (req as any).offer as Offer;

    await db.read();
    const order = db.data.orders.find(o => o.id === offerToAccept.orderId);

    if (!order) {
        return res.status(404).json({ message: 'Associated order not found.' });
    }
    if (order.clientId !== client.id) {
        return res.status(403).json({ message: 'You can only accept offers for your own orders.' });
    }
    if (order.status !== 'open') {
        return res.status(403).json({ message: 'This order is no longer open for offers.' });
    }

    // --- Critical Transaction Logic ---
    // 1. Update order
    order.status = 'accepted';
    order.masterId = offerToAccept.masterId;
    order.agreedPrice = offerToAccept.price;
    order.updatedAt = new Date();

    // 2. Update the accepted offer
    offerToAccept.status = 'accepted';

    // 3. Reject all other offers for this order
    const otherOffers = db.data.offers.filter(o => o.orderId === order.id && o.id !== offerToAccept.id);
    otherOffers.forEach(offer => {
        offer.status = 'rejected';
    });

    await db.write();

    res.json({ message: 'Offer accepted successfully.', order });
});

// 4. Retract/Delete an offer (by master)
app.delete('/api/offers/:id', authMiddleware, requireRole(['master']), getOffer, async (req: AuthRequest, res: Response) => {
    const master = req.user!;
    const offer = (req as any).offer as Offer;

    if (offer.masterId !== master.id) {
        return res.status(403).json({ message: 'You can only delete your own offers.' });
    }
    if (offer.status !== 'pending') {
        return res.status(403).json({ message: 'You can only delete offers that are still pending.' });
    }

    // Soft delete or hard delete. For now, hard delete.
    db.data.offers = db.data.offers.filter(o => o.id !== offer.id);

    // Decrement proposal count on the order
    const order = db.data.orders.find(o => o.id === offer.orderId);
    if(order) {
        order.proposalCount = Math.max(0, (order.proposalCount || 1) - 1);
    }

    await db.write();

    res.status(204).send(); // No Content
});


// --- PAYMENT & WORKFLOW API ---

// 1. Client pays for an accepted order (moves money to escrow)
app.post('/api/payments', authMiddleware, requireRole(['client']), async (req: AuthRequest, res: Response) => {
    const { orderId } = req.body;
    const client = req.user!;

    if(!orderId) {
        return res.status(400).json({ message: 'orderId is required.' });
    }

    await db.read();
    const order = db.data.orders.find(o => o.id === orderId);

    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }
    if (order.clientId !== client.id) {
        return res.status(403).json({ message: 'You can only pay for your own orders.' });
    }
    if (order.status !== 'accepted') {
        return res.status(403).json({ message: 'You can only pay for an order that has been accepted.' });
    }

    // Simulate payment process (e.g., deducting from client balance or using a card)
    // For now, we just update the status.
    order.status = 'in_progress';
    order.paymentStatus = 'escrowed';
    order.paymentAmount = order.agreedPrice!;
    order.paymentDate = new Date();
    order.updatedAt = new Date();

    await db.write();

    res.json({ message: 'Payment successful. Order is now in progress.', order });
});

// 2. Client releases payment upon work completion
app.post('/api/payments/:orderId/release', authMiddleware, requireRole(['client']), async (req: AuthRequest, res: Response) => {
    const { orderId } = req.params;
    const client = req.user!;

    await db.read();
    const order = db.data.orders.find(o => o.id === orderId);

    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }
    if (order.clientId !== client.id) {
        return res.status(403).json({ message: 'You can only release payments for your own orders.' });
    }
    if (order.status !== 'in_progress') {
        return res.status(403).json({ message: 'You can only release payment for an order that is in progress.' });
    }

    const master = db.data.users.find(u => u.id === order.masterId);
    if (!master) {
        // This should not happen in a consistent DB
        return res.status(500).json({ message: 'Master for this order not found.' });
    }

    // --- Critical Transaction ---
    // 1. Calculate earnings (90% of agreed price)
    const commission = order.agreedPrice! * 0.10;
    const earnings = order.agreedPrice! - commission;

    // 2. Update master's balance
    master.balance += earnings;
    master.completedOrders = (master.completedOrders || 0) + 1;

    // 3. Update order status
    order.status = 'completed';
    order.paymentStatus = 'released';
    order.releaseDate = new Date();
    order.completedAt = new Date();
    order.updatedAt = new Date();

    await db.write();

    res.json({ message: `Payment of ${earnings} released to master successfully.`, order });
});

// 3. Master notifies that work has started
app.post('/api/orders/:id/start', authMiddleware, requireRole(['master']), getOrder, async (req: AuthRequest, res: Response) => {
    const master = req.user!;
    const order = (req as any).order as Order;

    if(order.masterId !== master.id) {
        return res.status(403).json({ message: 'You are not the assigned master for this order.' });
    }
    // This endpoint is mostly for notification/logging purposes. The status is already set by payment.
    console.log(`Master ${master.name} has officially started work on order ${order.id}`);

    res.json({ message: 'Work started notification sent.' });
});

// 4. Master notifies that work is finished
app.post('/api/orders/:id/finish', authMiddleware, requireRole(['master']), getOrder, async (req: AuthRequest, res: Response) => {
    const master = req.user!;
    const order = (req as any).order as Order;

    if(order.masterId !== master.id) {
        return res.status(403).json({ message: 'You are not the assigned master for this order.' });
    }
    // This notifies the client that the work is done and they should check and release the payment.
    // The status remains 'in_progress' until the client releases the funds.
    order.updatedAt = new Date();
    // We could add a new field like `workFinishedAt` if needed.

    await db.write();

    res.json({ message: 'Client has been notified that work is finished. Awaiting payment release.' });
});


// --- ORDER MANAGEMENT API ---

// 1. Create a new order
app.post('/api/orders', authMiddleware, requireRole(['client']), async (req: AuthRequest, res: Response) => {
  const { title, description, device, budget, urgency } = req.body;
  const clientId = req.user!.id;

  if (!title || !description || !device) {
    return res.status(400).json({ message: 'Title, description, and device are required.' });
  }

  await db.read();

  const clientOrders = db.data.orders.filter(o => o.clientId === clientId && o.status !== 'completed' && o.status !== 'cancelled');
  if (clientOrders.length >= 10) {
    return res.status(403).json({ message: 'You have reached the maximum limit of 10 active orders.' });
  }

  const newOrder: Order = {
    id: `order-${Date.now()}`,
    clientId,
    clientName: req.user!.name,
    title,
    description,
    device,
    city: req.user!.city,
    budget: budget || 0,
    urgency: urgency || 'medium',
    status: 'open',
    createdAt: new Date(),
    updatedAt: new Date(),
    proposalCount: 0,
    // Initialize other fields...
    deviceType: 'Other',
    issue: '',
    paymentStatus: 'pending',
    paymentAmount: 0,
    escrowId: '',
    paymentDate: new Date(),
    disputeStatus: 'none'

  };

  db.data.orders.push(newOrder);
  await db.write();

  res.status(201).json(newOrder);
});

// 2. Get orders (logic depends on user role)
app.get('/api/orders', authMiddleware, async (req: AuthRequest, res: Response) => {
  await db.read();
  const user = req.user!;
  let orders;

  if (user.role === 'client') {
    orders = db.data.orders.filter(o => o.clientId === user.id);
  } else if (user.role === 'master') {
    orders = db.data.orders.filter(o => o.status === 'open' || o.masterId === user.id);
  } else { // admin or superadmin
    orders = db.data.orders;
  }

  res.json(orders);
});

// 3. Get a single order by ID
app.get('/api/orders/:id', authMiddleware, getOrder, async (req: AuthRequest, res: Response) => {
  const user = req.user!;
  const order = (req as any).order as Order;

  // Ownership check
  if (user.role !== 'admin' && user.role !== 'superadmin' && user.id !== order.clientId && user.id !== order.masterId) {
      return res.status(403).json({ message: 'You do not have permission to view this order.' });
  }

  res.json(order);
});

// 4. Update an order
app.patch('/api/orders/:id', authMiddleware, requireRole(['client']), getOrder, async (req: AuthRequest, res: Response) => {
  const user = req.user!;
  const order = (req as any).order as Order;

  // Check ownership and status
  if (order.clientId !== user.id) {
    return res.status(403).json({ message: 'You can only edit your own orders.' });
  }
  if (order.status !== 'open') {
    return res.status(403).json({ message: 'You can only edit orders that are currently open.' });
  }

  // Update logic
  const { title, description, budget } = req.body;
  if (title) order.title = title;
  if (description) order.description = description;
  if (budget) order.budget = budget;
  order.updatedAt = new Date();

  await db.write();
  res.json(order);
});

// 5. Cancel an order
app.post('/api/orders/:id/cancel', authMiddleware, requireRole(['client', 'admin']), getOrder, async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const order = (req as any).order as Order;

    // Client cancellation logic
    if (user.role === 'client') {
        if (order.clientId !== user.id) {
            return res.status(403).json({ message: 'You can only cancel your own orders.' });
        }
        if (order.status !== 'open' && order.status !== 'accepted') {
            return res.status(403).json({ message: 'You can only cancel an order before work has started. Please open a dispute if needed.' });
        }
    }

    // Admin can cancel any order, but for now, we just handle the status change
    order.status = 'cancelled';
    order.updatedAt = new Date();
    await db.write();

    res.json({ message: 'Order has been cancelled.', order });
});


// --- API ROUTES ---

// Example of a protected route
app.get('/api/profile/me', authMiddleware, (req: AuthRequest, res: Response) => {
    // req.user is guaranteed to be defined here by the middleware
    const { password, ...userProfile } = req.user!;
    res.json(userProfile);
});

// Get all devices (public route)
app.get('/api/devices', (req, res) => {
  res.json(allDevicesDatabase);
});


// --- ADMIN API ---

// Middleware to get user by ID
const getUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await db.read();
    const user = db.data.users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    (req as any).targetUser = user;
    next();
};

// 1. Get all users
app.get('/api/admin/users', authMiddleware, requireRole(['admin', 'superadmin']), async (req: AuthRequest, res: Response) => {
    await db.read();
    const users = db.data.users.map(u => {
        const { password, ...user } = u;
        return user;
    });
    res.json(users);
});

// 2. Get a single user
app.get('/api/admin/users/:id', authMiddleware, requireRole(['admin', 'superadmin']), getUser, (req: AuthRequest, res: Response) => {
    const { password, ...user } = (req as any).targetUser;
    res.json(user);
});

// 3. Update a user
app.patch('/api/admin/users/:id', authMiddleware, requireRole(['admin', 'superadmin']), getUser, async (req: AuthRequest, res: Response) => {
    const userToUpdate = (req as any).targetUser;
    const { role, balance, verified, blocked } = req.body;

    // Update fields if they are provided in the body
    if (role) userToUpdate.role = role;
    if (balance !== undefined) userToUpdate.balance = parseFloat(balance);
    if (verified !== undefined) userToUpdate.verified = verified;
    if (blocked !== undefined) userToUpdate.blocked = blocked;

    await db.write();
    const { password, ...updatedUser } = userToUpdate;
    res.json(updatedUser);
});

// 4. Ban/Unban a user
app.post('/api/admin/users/:id/ban', authMiddleware, requireRole(['admin', 'superadmin']), getUser, async (req: AuthRequest, res: Response) => {
    (req as any).targetUser.blocked = true;
    await db.write();
    res.json({ message: 'User has been banned.' });
});

app.post('/api/admin/users/:id/unban', authMiddleware, requireRole(['admin', 'superadmin']), getUser, async (req: AuthRequest, res: Response) => {
    (req as any).targetUser.blocked = false;
    await db.write();
    res.json({ message: 'User has been unbanned.' });
});

// 5. Get all orders (admin version)
app.get('/api/admin/orders', authMiddleware, requireRole(['admin', 'superadmin']), async (req: AuthRequest, res: Response) => {
    await db.read();
    res.json(db.data.orders);
});

// 6. Force update an order
app.patch('/api/admin/orders/:id', authMiddleware, requireRole(['admin', 'superadmin']), getOrder, async (req: AuthRequest, res: Response) => {
    const orderToUpdate = (req as any).order as Order;
    const { status, masterId } = req.body;

    if (status) orderToUpdate.status = status;
    if (masterId) orderToUpdate.masterId = masterId;
    orderToUpdate.updatedAt = new Date();

    await db.write();
    res.json(orderToUpdate);
});

// 7. Manually manage escrow payment for an order
app.post('/api/admin/escrow/:orderId/refund', authMiddleware, requireRole(['admin', 'superadmin']), async (req: AuthRequest, res: Response) => {
    const { orderId } = req.params;
    await db.read();
    const order = db.data.orders.find(o => o.id === orderId);

    if(!order) return res.status(404).json({ message: 'Order not found.' });

    // Simulate refund to client's balance (if you track that)
    order.paymentStatus = 'refunded';
    order.status = 'cancelled'; // Or another appropriate status
    await db.write();

    res.json({ message: 'Payment has been refunded to the client.', order });
});


// --- DISPUTE MANAGEMENT API ---

// 1. Create a dispute for an order
app.post('/api/disputes', authMiddleware, async (req: AuthRequest, res: Response) => {
    const { orderId, reason, description } = req.body;
    const user = req.user!;

    if(!orderId || !reason) {
        return res.status(400).json({ message: 'orderId and reason are required.' });
    }

    await db.read();
    const order = db.data.orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }
    // Authorization check
    if (order.clientId !== user.id && order.masterId !== user.id) {
        return res.status(403).json({ message: 'You must be the client or master to open a dispute for this order.' });
    }
    if (order.status !== 'in_progress') {
        return res.status(403).json({ message: 'Disputes can only be opened for orders that are in progress.' });
    }

    // --- Critical Transaction ---
    // 1. Change order status
    order.status = 'disputed';
    order.disputeStatus = 'open';

    // 2. Create the dispute record
    const newDispute: Dispute = {
        id: `dispute-${Date.now()}`,
        orderId,
        clientId: order.clientId,
        masterId: order.masterId!,
        reason,
        description: description || '',
        status: 'open',
        createdAt: new Date(),
        resolution: 'Dispute has been opened.'
    };
    db.data.disputes.push(newDispute);

    await db.write();

    res.status(201).json({ message: 'Dispute created successfully. An admin will review your case.', dispute: newDispute });
});


// 2. Admin resolves a dispute
app.post('/api/disputes/:id/resolve', authMiddleware, requireRole(['admin', 'superadmin']), async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { resolution } = req.body; // 'client_wins', 'master_wins', 'compromise'

    if (!resolution || !['client_wins', 'master_wins', 'compromise'].includes(resolution)) {
        return res.status(400).json({ message: "Invalid resolution type. Must be 'client_wins', 'master_wins', or 'compromise'." });
    }

    await db.read();
    const dispute = db.data.disputes.find(d => d.id === id);
    if (!dispute) {
        return res.status(404).json({ message: 'Dispute not found.' });
    }

    const order = db.data.orders.find(o => o.id === dispute.orderId);
    if (!order) {
        return res.status(500).json({ message: 'Associated order not found. Database inconsistency.' });
    }

    const master = db.data.users.find(u => u.id === order.masterId);
     if (!master) {
        return res.status(500).json({ message: 'Master for this order not found.' });
    }

    // --- Handle Resolution ---
    dispute.status = 'resolved';
    dispute.resolvedAt = new Date();
    dispute.resolutionBy = req.user!.id;

    if (resolution === 'client_wins') {
        order.status = 'cancelled';
        order.paymentStatus = 'refunded';
        dispute.resolution = "Resolved in favor of the client. Full refund issued.";
        // In a real system, you would transfer funds back to the client here.
    } else if (resolution === 'master_wins') {
        order.status = 'completed';
        order.paymentStatus = 'released';
        dispute.resolution = "Resolved in favor of the master. Payment released.";

        // Release payment to master (same logic as normal release)
        const commission = order.agreedPrice! * 0.10;
        const earnings = order.agreedPrice! - commission;
        master.balance += earnings;
        master.completedOrders = (master.completedOrders || 0) + 1;

    } else { // compromise
        order.status = 'completed'; // Or as decided
        dispute.resolution = "Resolved with a compromise. Funds handled manually by admin.";
        // Logic for partial refund/payment would go here
    }

    await db.write();

    res.json({ message: `Dispute resolved: ${resolution}`, dispute });
});



// --- REVIEWS & WITHDRAWALS ---

// 1. Create a review for a completed order
app.post('/api/reviews', authMiddleware, requireRole(['client']), async (req: AuthRequest, res: Response) => {
    const { orderId, rating, text } = req.body;
    const client = req.user!;

    if (!orderId || rating === undefined) {
        return res.status(400).json({ message: 'orderId and rating are required.' });
    }

    await db.read();
    const order = db.data.orders.find(o => o.id === orderId);
    if (!order) return res.status(404).json({ message: 'Order not found.' });

    if (order.clientId !== client.id) return res.status(403).json({ message: 'You can only review your own orders.' });
    if (order.status !== 'completed') return res.status(403).json({ message: 'You can only review completed orders.' });

    const existingReview = db.data.reviews.find(r => r.orderId === orderId && r.authorId === client.id);
    if (existingReview) return res.status(409).json({ message: 'You have already submitted a review for this order.' });

    const newReview: Review = {
        id: `review-${Date.now()}`,
        orderId,
        authorId: client.id,
        authorName: client.name,
        rating: Math.max(0, Math.min(5, rating)), // Clamp rating between 0 and 5
        text: text || '',
        status: 'approved', // Auto-approve for now
        createdAt: new Date(),
    };
    db.data.reviews.push(newReview);

    // Update master's average rating
    const master = db.data.users.find(u => u.id === order.masterId);
    if (master) {
        const masterReviews = db.data.reviews.filter(r => db.data.orders.some(o => o.id === r.orderId && o.masterId === master.id));
        const totalRating = masterReviews.reduce((acc, r) => acc + r.rating, 0);
        master.rating = totalRating / masterReviews.length;
    }

    await db.write();
    res.status(201).json(newReview);
});

// 2. Master requests a withdrawal
app.post('/api/withdrawals', authMiddleware, requireRole(['master']), async (req: AuthRequest, res: Response) => {
    const { amount } = req.body;
    const master = req.user!;

    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: 'A valid amount is required.' });
    }

    await db.read();
    // Re-fetch user from DB to ensure we have the latest balance
    const freshMaster = db.data.users.find(u => u.id === master.id)!;

    if (freshMaster.balance < 500) {
        return res.status(403).json({ message: `Minimum withdrawal amount is 500. Your balance is ${freshMaster.balance}.` });
    }
    if (freshMaster.balance < amount) {
        return res.status(403).json({ message: `Insufficient funds. Your balance is ${freshMaster.balance}.` });
    }

    freshMaster.balance -= amount;
    await db.write();

    // In a real app, this would trigger a payout process.
    res.json({ message: 'Withdrawal request successful.', newBalance: freshMaster.balance });
});


// --- SIMULATED CRON JOB for Auto-Release ---
function startAutoReleaseCron() {
    console.log('Starting simulated cron job for auto-release...');
    setInterval(async () => {
        await db.read();
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const ordersToRelease = db.data.orders.filter(o =>
            o.status === 'in_progress' &&
            o.completedAt && // Assuming master marks it as finished, setting this date
            new Date(o.completedAt) < sevenDaysAgo
        );

        if (ordersToRelease.length > 0) {
            console.log(`[CRON] Found ${ordersToRelease.length} orders to auto-release.`);
            for (const order of ordersToRelease) {
                // Same logic as manual release
                const master = db.data.users.find(u => u.id === order.masterId);
                if (master) {
                    const commission = order.agreedPrice! * 0.10;
                    const earnings = order.agreedPrice! - commission;
                    master.balance += earnings;
                    master.completedOrders = (master.completedOrders || 0) + 1;

                    order.status = 'completed';
                    order.paymentStatus = 'released';
                    order.releaseDate = new Date();
                    console.log(`[CRON] Auto-released payment for order ${order.id}.`);
                }
            }
            await db.write();
        }
    }, 60 * 60 * 1000); // Check every hour
}


// --- SERVER INITIALIZATION ---
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    startAutoReleaseCron(); // Start the cron job after server starts
  });
}).catch(error => {
  console.error("Failed to initialize and start server:", error);
});
