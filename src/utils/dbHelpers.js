const { getDb } = require('../config/database');

async function runTransaction(callback) {
  const db = await getDb();
  try {
    await db.run('BEGIN TRANSACTION');
    await callback(db);
    await db.run('COMMIT');
  } catch (error) {
    await db.run('ROLLBACK');
    throw error;
  }
}

async function safeQuery(query, params = []) {
  const db = await getDb();
  try {
    return await db.all(query, params);
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

module.exports = {
  runTransaction,
  safeQuery
};