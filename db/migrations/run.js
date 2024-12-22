const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const fs = require('fs').promises;
const path = require('path');

async function runMigrations() {
  try {
    // Create db directory
    const dbDir = path.join(__dirname, '..');
    await fs.mkdir(dbDir, { recursive: true });
    
    // Open database connection
    const db = await open({
      filename: path.join(dbDir, 'database.sqlite'),
      driver: sqlite3.Database
    });

    console.log('Running migrations...');

    // Execute schema
    const schema = await fs.readFile(path.join(__dirname, 'init.sql'), 'utf-8');
    await db.exec(schema);
    
    console.log('Migration completed successfully');
    await db.close();
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}