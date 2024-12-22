import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'database.sqlite');

export async function getDb() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  
  // Run migrations
  const migration = await fs.readFile(path.join(__dirname, 'migrations/init.sql'), 'utf-8');
  await db.exec(migration);
  
  return db;
}