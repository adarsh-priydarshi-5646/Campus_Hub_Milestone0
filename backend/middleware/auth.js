const jwt = require('jsonwebtoken');
const prisma = require('../config/db.config');

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if session exists and is active in database
    let session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });

    // If session doesn't exist, create one (backward compatibility for old tokens)
    if (!session) {
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      // Create session for existing token
      const expiresAt = new Date(decoded.exp * 1000); // JWT exp is in seconds
      session = await prisma.session.create({
        data: {
          userId: user.id,
          token,
          expiresAt,
        },
        include: { user: true }
      });
    }

    // Check if session is active
    if (!session.isActive) {
      return res.status(401).json({ error: 'Session expired or invalid' });
    }

    // Check if session has expired
    if (new Date() > session.expiresAt) {
      await prisma.session.update({
        where: { id: session.id },
        data: { isActive: false }
      });
      return res.status(401).json({ error: 'Session expired' });
    }

    // Update last used timestamp
    await prisma.session.update({
      where: { id: session.id },
      data: { lastUsed: new Date() }
    });

    req.user = session.user;
    next();
    
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Auth middleware error:', error);
    }
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { authenticateToken };
