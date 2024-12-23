import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Telegraf } from 'telegraf';
import { fileURLToPath } from 'url';
import path from 'path';
import { dbAsync } from './db/config.js';

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

// Bot setup
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
  const username = ctx.from.username || ctx.from.first_name || 'guest';
  const gameUrl = `https://t.me/${process.env.BOT_USERNAME}/mmx_memex?username=${username}`;

  try {
    await ctx.replyWithPhoto('https://cdn.glitch.global/41b9d177-2df3-49bd-8ecc-057b6d9aa045/1.jpg', {
      caption: `Welcome to MEMEX Airdrop, @${username}! 🎮\n\n` +
        `🌟 **Join the airdrop and earn your first rewards!**\n` +
        `✅ **Complete simple tasks and withdraw your earnings directly to your wallet!**\n` +
        `🚀 Powered by **Electra Protocol**, ensuring the lowest fees, fastest transactions, and ultimate security!`,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[{ text: '🟩 Claim Your Airdrop', url: gameUrl }]]
      }
    });
  } catch (error) {
    console.error('Bot error:', error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  bot.launch().catch(console.error);
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));