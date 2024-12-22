import { db, dbAsync } from './config.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createTables() {
  // Kullanıcılar tablosunu oluştur
  await dbAsync.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      balance INTEGER DEFAULT 500000,
      tasks_completed TEXT DEFAULT '[]',
      referral_earnings INTEGER DEFAULT 0,
      total_referrals INTEGER DEFAULT 0,
      last_login TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Çekimler tablosunu oluştur
  await dbAsync.run(`
    CREATE TABLE IF NOT EXISTS withdrawals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      wallet_address TEXT NOT NULL,
      amount INTEGER NOT NULL,
      timestamp TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function migrateData() {
  try {
    await createTables();

    // Kullanıcıları aktar
    const usersData = await fs.readFile(
      path.join(__dirname, '../public/data/users.json'),
      'utf8'
    );
    const users = JSON.parse(usersData);

    for (const user of users) {
      await dbAsync.run(
        `INSERT OR IGNORE INTO users (
          username, balance, tasks_completed, referral_earnings,
          total_referrals, last_login
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          user.username,
          user.balance,
          JSON.stringify(user.tasks_completed),
          user.referral_earnings || 0,
          user.total_referrals || 0,
          user.last_login
        ]
      );
    }

    // Çekimleri aktar
    const withdrawalsData = await fs.readFile(
      path.join(__dirname, '../public/data/withdrawals.json'),
      'utf8'
    );
    const withdrawals = JSON.parse(withdrawalsData);

    for (const withdrawal of withdrawals) {
      await dbAsync.run(
        `INSERT INTO withdrawals (username, wallet_address, amount, timestamp)
         VALUES (?, ?, ?, ?)`,
        [
          withdrawal.username,
          withdrawal.wallet_address,
          withdrawal.amount,
          withdrawal.timestamp
        ]
      );
    }

    console.log('Veri aktarımı başarıyla tamamlandı!');
  } catch (error) {
    console.error('Veri aktarımı sırasında hata:', error);
  } finally {
    db.close();
  }
}

migrateData();