const Database = require('better-sqlite3');
const path = require('path');

let db = null;

function getDb() {
    if (!db) {
        try {
            const dbPath = path.join(__dirname, 'database.sqlite');
            db = new Database(dbPath, { verbose: console.log });
            
            // Enable foreign keys
            db.pragma('foreign_keys = ON');
            
            // Create tables if they don't exist
            const schema = `
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE NOT NULL,
                    balance INTEGER DEFAULT 500000,
                    tasks_completed TEXT DEFAULT '[]',
                    referral_earnings INTEGER DEFAULT 0,
                    total_referrals INTEGER DEFAULT 0,
                    last_login TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );

                CREATE TABLE IF NOT EXISTS withdrawals (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL,
                    wallet_address TEXT NOT NULL,
                    amount INTEGER NOT NULL,
                    timestamp TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );

                CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
                CREATE INDEX IF NOT EXISTS idx_withdrawals_username ON withdrawals(username);
                CREATE INDEX IF NOT EXISTS idx_withdrawals_timestamp ON withdrawals(timestamp);
            `;

            db.exec(schema);
            console.log('Database initialized successfully');
        } catch (error) {
            console.error('Database initialization error:', error);
            throw error;
        }
    }
    return db;
}

function closeDb() {
    if (db) {
        db.close();
        db = null;
    }
}

module.exports = {
    getDb,
    closeDb
};