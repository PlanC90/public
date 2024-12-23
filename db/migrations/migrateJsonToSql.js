import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dbAsync } from '../config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function readJsonFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return [];
    }
}

async function migrateData() {
    const dataDir = path.join(__dirname, '../../public/data');
    
    try {
        console.log('Starting migration from JSON to PostgreSQL...');

        // Start transaction
        await dbAsync.query('BEGIN');

        // Migrate users
        console.log('Migrating users...');
        const users = await readJsonFile(path.join(dataDir, 'users.json'));
        for (const user of users) {
            await dbAsync.query(
                `INSERT INTO users (
                    username, balance, tasks_completed, referral_earnings,
                    total_referrals, last_login
                ) VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (username) DO UPDATE SET
                    balance = EXCLUDED.balance,
                    tasks_completed = EXCLUDED.tasks_completed,
                    referral_earnings = EXCLUDED.referral_earnings,
                    total_referrals = EXCLUDED.total_referrals,
                    last_login = EXCLUDED.last_login`,
                [
                    user.username,
                    user.balance,
                    JSON.stringify(user.tasks_completed || []),
                    user.referral_earnings || 0,
                    user.total_referrals || 0,
                    user.last_login || new Date().toISOString()
                ]
            );
        }
        console.log(`${users.length} users migrated`);

        // Migrate withdrawals
        console.log('Migrating withdrawals...');
        const withdrawals = await readJsonFile(path.join(dataDir, 'withdrawals.json'));
        for (const withdrawal of withdrawals) {
            await dbAsync.query(
                `INSERT INTO withdrawals (
                    username, wallet_address, amount, timestamp
                ) VALUES ($1, $2, $3, $4)
                ON CONFLICT DO NOTHING`,
                [
                    withdrawal.username,
                    withdrawal.walletAddress || withdrawal.wallet_address,
                    withdrawal.amount,
                    withdrawal.timestamp
                ]
            );
        }
        console.log(`${withdrawals.length} withdrawals migrated`);

        // Commit transaction
        await dbAsync.query('COMMIT');
        console.log('Migration completed successfully!');

        // Create backup directory
        const backupDir = path.join(dataDir, 'backup');
        await fs.mkdir(backupDir, { recursive: true });

        // Backup JSON files
        const files = ['users.json', 'withdrawals.json'];
        for (const file of files) {
            const sourcePath = path.join(dataDir, file);
            const backupPath = path.join(backupDir, `${file}.bak`);
            await fs.copyFile(sourcePath, backupPath);
            console.log(`${file} backed up to ${backupPath}`);
        }

    } catch (error) {
        await dbAsync.query('ROLLBACK');
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

// Run migration
migrateData().catch(console.error);