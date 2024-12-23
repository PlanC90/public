import fs from 'fs/promises';
import path from 'path';

export async function ensureDirectoryExists(dir) {
    try {
        await fs.access(dir);
        console.log(`Directory exists: ${dir}`);
    } catch {
        await fs.mkdir(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
}

export async function createFileIfNotExists(filePath, content) {
    try {
        await fs.access(filePath);
        console.log(`File exists: ${filePath}`);
    } catch {
        await fs.writeFile(filePath, content);
        console.log(`Created file: ${filePath}`);
    }
}

export async function copyFile(src, dest) {
    try {
        await fs.copyFile(src, dest);
        console.log(`Copied ${src} to ${dest}`);
    } catch (error) {
        console.error(`Error copying file: ${error.message}`);
        throw error;
    }
}

export async function readJsonFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading JSON file: ${error.message}`);
        return null;
    }
}

export async function writeJsonFile(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        console.log(`Wrote JSON file: ${filePath}`);
    } catch (error) {
        console.error(`Error writing JSON file: ${error.message}`);
        throw error;
    }
}