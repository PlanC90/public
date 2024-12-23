import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { executeMigration } from '../utils/migration.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runMigrations() {
    console.log('Starting database migrations...');
    
    try {
        const migrationPath = path.join(__dirname, 'init.sql');
        const sql = await fs.readFile(migrationPath, 'utf8');
        await executeMigration(sql);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

runMigrations();