const { getDb } = require('../config/database');
const { runTransaction } = require('../utils/dbHelpers');

const withdrawalRepository = {
    async create(withdrawalData) {
        return await runTransaction(async (db) => {
            const result = await db.run(
                `INSERT INTO withdrawals (username, wallet_address, amount, timestamp)
                 VALUES (?, ?, ?, ?)`,
                [
                    withdrawalData.username,
                    withdrawalData.wallet_address,
                    withdrawalData.amount,
                    withdrawalData.timestamp
                ]
            );
            
            // Return created withdrawal
            return {
                id: result.lastID,
                ...withdrawalData
            };
        });
    },

    async findByUsername(username) {
        const db = await getDb();
        return await db.all(
            'SELECT * FROM withdrawals WHERE username = ? ORDER BY timestamp DESC',
            username
        );
    },

    async getAll() {
        const db = await getDb();
        return await db.all('SELECT * FROM withdrawals ORDER BY timestamp DESC');
    }
};

module.exports = { withdrawalRepository };