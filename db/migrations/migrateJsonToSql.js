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
        // Start transaction
        await dbAsync.run('BEGIN TRANSACTION');

        console.log('Migrating user data...');
        const users = await readJsonFile(path.join(dataDir, 'users.json'));
        for (const user of users) {
            await dbAsync.run(
                `INSERT OR IGNORE INTO users (
                    username, balance, tasks_completed, referral_earnings,
                    total_referrals, last_login
                ) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    user.username,
                    user.balance,
                    JSON.stringify(user.tasks_completed || []),
                    user.referral_earnings || 0,
                    user.total_referrals || 0,
                    user.last_login
                ]
            );
        }
        console.log(`${users.length} users migrated`);

        console.log('Migrating withdrawal data...');
        const withdrawals = await readJsonFile(path.join(dataDir, 'withdrawals.json'));
        for (const withdrawal of withdrawals) {
            await dbAsync.run(
                `INSERT OR IGNORE INTO withdrawals (
                    username, wallet_address, amount, timestamp
                ) VALUES (?, ?, ?, ?)`,
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
        await dbAsync.run('COMMIT');
        console.log('Database migration successful!');

        // Backup and remove JSON files
        const backupDir = path.join(dataDir, 'backup');
        await fs.mkdir(backupDir, { recursive: true });

        const jsonFiles = ['users.json', 'withdrawals.json'];
        for (const file of jsonFiles) {
            const sourcePath = path.join(dataDir, file);
            const backupPath = path.join(backupDir, `${file}.bak`);
            
            await fs.copyFile(sourcePath, backupPath);
            await fs.unlink(sourcePath);
            console.log(`${file} backed up and removed`);
        }

        console.log('All operations completed successfully!');

    } catch (error) {
        await dbAsync.run('ROLLBACK');
        console.error('Migration error:', error);
        throw error;
    }
}