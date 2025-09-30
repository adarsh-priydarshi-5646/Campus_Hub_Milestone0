/**
 * View Sessions Script
 * 
 * This script displays all active sessions in the database.
 * Useful for debugging and monitoring user sessions.
 * 
 * Usage: node scripts/viewSessions.js
 */

const prisma = require('../config/db.config');

async function viewSessions() {
  try {
    console.log('🔍 Fetching all sessions...\n');
    
    const sessions = await prisma.session.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        lastUsed: 'desc'
      }
    });
    
    if (sessions.length === 0) {
      console.log('📭 No sessions found in database.');
      return;
    }
    
    console.log(`📊 Found ${sessions.length} session(s):\n`);
    
    sessions.forEach((session, index) => {
      const status = session.isActive ? '✅ Active' : '❌ Inactive';
      const expired = new Date() > session.expiresAt ? '⏰ Expired' : '✓ Valid';
      
      console.log(`Session #${index + 1}:`);
      console.log(`  Status: ${status} ${expired}`);
      console.log(`  User: ${session.user.name} (${session.user.email})`);
      console.log(`  Created: ${session.createdAt.toLocaleString()}`);
      console.log(`  Expires: ${session.expiresAt.toLocaleString()}`);
      console.log(`  Last Used: ${session.lastUsed.toLocaleString()}`);
      console.log(`  Token: ${session.token.substring(0, 20)}...`);
      console.log('');
    });
    
    // Statistics
    const activeCount = sessions.filter(s => s.isActive).length;
    const expiredCount = sessions.filter(s => new Date() > s.expiresAt).length;
    
    console.log('📈 Statistics:');
    console.log(`  Total: ${sessions.length}`);
    console.log(`  Active: ${activeCount}`);
    console.log(`  Inactive: ${sessions.length - activeCount}`);
    console.log(`  Expired: ${expiredCount}`);
    
  } catch (error) {
    console.error('❌ Error fetching sessions:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run view
viewSessions();
