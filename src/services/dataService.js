import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function saveData(fileName, data) {
    const filePath = path.join(__dirname, '../../public/data', fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}