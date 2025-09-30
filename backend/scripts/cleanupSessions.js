/**
 * Session Cleanup Script
 * 
 * This script cleans up expired and inactive sessions from the database.
 * Run this periodically (e.g., via cron job) to keep the database clean.
 * 
 * Usage: node scripts/cleanupSessions.js
 */

const prisma = require('../config/db.config');

async function cleanupExpiredSessions() {
  try {
    console.log('🧹 Starting session cleanup...');
    
    const now = new Date();
    
    // Delete expired sessions
    const expiredResult = await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: now
        }
      }
    });
    
    console.log(`✅ Deleted ${expiredResult.count} expired sessions`);
    
    // Delete inactive sessions older than 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const inactiveResult = await prisma.session.deleteMany({
      where: {
        isActive: false,
        createdAt: {
          lt: thirtyDaysAgo
        }
      }
    });
    
    console.log(`✅ Deleted ${inactiveResult.count} old inactive sessions`);
    
    // Get session statistics
    const totalSessions = await prisma.session.count();
    const activeSessions = await prisma.session.count({
      where: { isActive: true }
    });
    
    console.log('\n📊 Session Statistics:');
    console.log(`   Total sessions: ${totalSessions}`);
    console.log(`   Active sessions: ${activeSessions}`);
    console.log(`   Inactive sessions: ${totalSessions - activeSessions}`);
    
    console.log('\n✨ Cleanup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run cleanup
cleanupExpiredSessions();
