import { getDb, closeDb } from '../config.js';
import { migrationService } from '../services/migrationService.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runMigrations() {
  try {
    // Create database schema
    const db = await getDb();
    const sql = await fs.readFile(path.join(__dirname, 'init.sql'), 'utf-8');
    await db.exec(sql);
    console.log('Schema creation completed');

    // Migrate data from JSON files
    await migrationService.migrateData();
    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  } finally {
    await closeDb();
  }
}

runMigrations();