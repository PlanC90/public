import fs from 'fs/promises';
import path from 'path';

export async function ensureDirectoryExists(dir) {
    try {
        await fs.mkdir(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    } catch (error) {
        if (error.code !== 'EEXIST') {
            throw error;
        }
    }
}

export async function createFileIfNotExists(filePath, content = '') {
    try {
        await fs.access(filePath);
        console.log(`File exists: ${filePath}`);
    } catch {
        await fs.writeFile(filePath, content);
        console.log(`Created file: ${filePath}`);
    }
}