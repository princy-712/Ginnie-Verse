const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanupDatabase() {
  try {
    console.log('Starting database cleanup...');

    // 1. Delete child records first (to respect foreign key constraints)
    console.log('Deleting assessments...');
    await prisma.assessment.deleteMany({});
    
    console.log('Deleting cover letters...');
    await prisma.coverLetter.deleteMany({});
    
    console.log('Deleting resumes...');
    await prisma.resume.deleteMany({});

    // 2. Update users to remove industry references
    console.log('Updating users to remove industry references...');
    await prisma.user.updateMany({
      data: { industry: null }
    });

    // 3. Delete industry insights
    console.log('Deleting industry insights...');
    await prisma.industryInsights.deleteMany({});

    // 4. Finally delete users
    console.log('Deleting users...');
    await prisma.user.deleteMany({});

    console.log('Database cleanup completed successfully!');
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupDatabase();
