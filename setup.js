const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

async function setup() {
    console.log('Starting setup...');

    try {
        // Create necessary directories
        const dirs = ['db', 'public/data'];
        for (const dir of dirs) {
            await fs.mkdir(path.join(__dirname, dir), { recursive: true });
        }

        // Create .env if it doesn't exist
        const envPath = path.join(__dirname, '.env');
        try {
            await fs.access(envPath);
            console.log('.env file exists');
        } catch {
            console.log('Creating .env file...');
            const defaultEnv = `BOT_TOKEN=your_telegram_bot_token
BOT_USERNAME=your_bot_username
PORT=3000`;
            await fs.writeFile(envPath, defaultEnv);
        }

        console.log('Setup completed successfully!');
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