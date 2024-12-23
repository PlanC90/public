import path from 'path';
import { fileURLToPath } from 'url';
import { ensureDirectoryExists, createFileIfNotExists } from './db/utils/fileSystem.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const REQUIRED_DIRS = [
    'db',
    'db/migrations',
    'public/data'
];

const ENV_TEMPLATE = `# Bot Configuration
BOT_TOKEN=your_telegram_bot_token
BOT_USERNAME=your_bot_username

# Server Configuration
PORT=3000
`;

const INITIAL_JSON_FILES = {
    'users.json': '[]',
    'withdrawals.json': '[]',
    'referrals.json': '[]'
};

async function setup() {
    console.log('Starting setup...');

    try {
        // Create required directories
        for (const dir of REQUIRED_DIRS) {
            await ensureDirectoryExists(path.join(__dirname, dir));
        }

        // Create .env file if not exists
        await createFileIfNotExists(
            path.join(__dirname, '.env'),
            ENV_TEMPLATE
        );

        // Create initial JSON files
        const dataDir = path.join(__dirname, 'public/data');
        for (const [filename, content] of Object.entries(INITIAL_JSON_FILES)) {
            await createFileIfNotExists(
                path.join(dataDir, filename),
                content
            );
        }

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