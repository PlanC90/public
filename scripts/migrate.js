import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrate() {
  try {
    console.log('Starting migration...');

    // Ensure data directory exists
    const dataDir = path.join(__dirname, '../public/data');
    await fs.mkdir(dataDir, { recursive: true });

    // Create users.json if it doesn't exist
    const usersPath = path.join(dataDir, 'users.json');
    try {
      await fs.access(usersPath);
      console.log('users.json exists');
    } catch {
      await fs.writeFile(usersPath, '[]');
      console.log('Created users.json');
    }

    // Create withdrawals.json if it doesn't exist
    const withdrawalsPath = path.join(dataDir, 'withdrawals.json');
    try {
      await fs.access(withdrawalsPath);
      console.log('withdrawals.json exists');
    } catch {
      await fs.writeFile(withdrawalsPath, '[]');
      console.log('Created withdrawals.json');
    }

    // Create referrals.json if it doesn't exist
    const referralsPath = path.join(dataDir, 'referrals.json');
    try {
      await fs.access(referralsPath);
      console.log('referrals.json exists');
    } catch {
      await fs.writeFile(referralsPath, '[]');
      console.log('Created referrals.json');
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();