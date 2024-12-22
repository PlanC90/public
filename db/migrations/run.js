const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs');

async function runMigrations() {
  const dbPath = path.join(__dirname, '../database.sqlite');
  const db = new sqlite3.Database(dbPath);

  try {
    // Read and execute migration SQL
    const sql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');
    
    db.serialize(() => {
      // Enable foreign keys
      db.run('PRAGMA foreign_keys = ON');

      // Execute migrations
      db.exec(sql, (err) => {
        if (err) {
          console.error('Migration error:', err);
          process.exit(1);
        }
        console.log('Migrations completed successfully');
      });
    });

  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  } finally {
    db.close();
  }
}

runMigrations();