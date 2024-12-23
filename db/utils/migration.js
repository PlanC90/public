import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../database.sqlite');

export async function executeMigration(sql) {
    const db = new sqlite3.Database(dbPath);
    
    try {
        await new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('PRAGMA foreign_keys = ON');
                db.run('BEGIN TRANSACTION');
                
                db.exec(sql, (err) => {
                    if (err) {
                        console.error('Migration error:', err);
                        db.run('ROLLBACK');
                        reject(err);
                        return;
                    }
                    
                    db.run('COMMIT', (err) => {
                        if (err) {
                            console.error('Commit error:', err);
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                });
            });
        });
        
        console.log('Migration completed successfully');
    } catch (error) {
        throw error;
    } finally {
        db.close();
    }
}