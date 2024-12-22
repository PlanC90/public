const fs = require('fs').promises;
const path = require('path');
const { getDb } = require('../config');

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
    const db = await getDb();
    const dataDir = path.join(__dirname, '../../public/data');
    
    try {
        // Başla transaction
        await db.run('BEGIN TRANSACTION');

        console.log('Kullanıcı verilerini aktarma başladı...');
        const users = await readJsonFile(path.join(dataDir, 'users.json'));
        for (const user of users) {
            await db.run(
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
        console.log(`${users.length} kullanıcı aktarıldı`);

        console.log('Çekim verilerini aktarma başladı...');
        const withdrawals = await readJsonFile(path.join(dataDir, 'withdrawals.json'));
        for (const withdrawal of withdrawals) {
            await db.run(
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
        console.log(`${withdrawals.length} çekim aktarıldı`);

        // Transaction'ı tamamla
        await db.run('COMMIT');
        console.log('Veritabanı aktarımı başarılı!');

        // JSON dosyalarını yedekle ve sil
        const backupDir = path.join(dataDir, 'backup');
        await fs.mkdir(backupDir, { recursive: true });

        const jsonFiles = ['users.json', 'withdrawals.json'];
        for (const file of jsonFiles) {
            const sourcePath = path.join(dataDir, file);
            const backupPath = path.join(backupDir, `${file}.bak`);
            
            // Dosyayı yedekle
            await fs.copyFile(sourcePath, backupPath);
            // Orijinal dosyayı sil
            await fs.unlink(sourcePath);
            console.log(`${file} yedeklendi ve silindi`);
        }

        console.log('Tüm işlemler başarıyla tamamlandı!');

    } catch (error) {
        await db.run('ROLLBACK');
        console.error('Migrasyon hatası:', error);
        throw error;
    }
}

// Migrasyon'u çalıştır
migrateData().catch(console.error);