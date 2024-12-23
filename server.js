import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { dbAsync } from './db/config.js';
import { setupBot } from './src/services/botService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', async (req, res) => {
  try {
    await dbAsync.get('SELECT 1');
    res.json({ status: 'ok', message: 'Database connection successful' });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

// Initialize bot
const bot = setupBot();

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  
  if (bot) {
    bot.launch()
      .then(() => console.log('Telegram bot started successfully'))
      .catch(error => {
        if (error.message.includes('Bot Token is required')) {
          console.warn('Bot token not found in Replit Secrets. Please add BOT_TOKEN to your Secrets.');
        } else {
          console.error('Bot failed to launch:', error.message);
        }
      });
  }
});

// Graceful shutdown
process.once('SIGINT', () => bot?.stop('SIGINT'));
process.once('SIGTERM', () => bot?.stop('SIGTERM'));