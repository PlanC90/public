const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

let db = null;

async function getDb() {
    if (db) return db;
    
    db = await open({
        filename: path.join(__dirname, '../../db/database.sqlite'),
        driver: sqlite3.Database
    });

    return db;
}

async function closeDb() {
    if (db) {
        await db.close();
        db = null;
    }
}

module.exports = {
    getDb,
    closeDb
};