import path from 'path';
import { fileURLToPath } from 'url';
import { ensureDirectoryExists, createFileIfNotExists } from './db/utils/fileSystem.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function setup() {
    console.log('Starting setup...');

    try {
        // Create required directories
        const directories = [
            'db',
            'db/migrations',
            'public/data'
        ];

        for (const dir of directories) {
            await ensureDirectoryExists(path.join(__dirname, dir));
        }

        // Create .env if not exists
        const envContent = `# Bot Configuration
BOT_TOKEN=your_telegram_bot_token
BOT_USERNAME=your_bot_username

# Server Configuration
PORT=3000`;
        await createFileIfNotExists(path.join(__dirname, '.env'), envContent);

        // Create initial migration file
        const migrationContent = await fs.readFile(
            path.join(__dirname, 'db/migrations/init.sql'),
            'utf-8'
        );
        await createFileIfNotExists(
            path.join(__dirname, 'db/migrations/init.sql'),
            migrationContent
        );

        console.log('\nSetup completed successfully!');
        console.log('\nNext steps:');
        console.log('1. Update .env with your Telegram bot credentials');
        console.log('2. Run: npm install');
        console.log('3. Run: npm run migrate');
        console.log('4. Run: npm start');

    } catch (error) {
        console.error('Setup failed:', error);
        process.exit(1);
    }
}

setup();