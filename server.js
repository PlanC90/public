import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Telegraf } from 'telegraf';
import { UserModel } from './db/models/user.js';
import { WithdrawalModel } from './db/models/withdrawal.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API Routes
app.post('/save/:fileName', async (req, res) => {
    const { fileName } = req.params;
    const data = req.body;

    try {
        if (fileName === 'users.json') {
            // Kullanıcı verilerini SQLite'a kaydet
            const user = data;
            await UserModel.updateBalance(user.username, user.balance);
            await UserModel.updateTasks(user.username, user.tasks_completed);
        } else if (fileName === 'withdrawals.json') {
            // Çekim verilerini SQLite'a kaydet
            await WithdrawalModel.create(data);
        }
        res.status(200).send('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data');
    }
});

// Kullanıcı verilerini getir
app.get('/api/users/:username', async (req, res) => {
    try {
        const user = await UserModel.findByUsername(req.params.username);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Çekim verilerini getir
app.get('/api/withdrawals', async (req, res) => {
    try {
        const withdrawals = await WithdrawalModel.getAll();
        res.json(withdrawals);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Bot başlatma
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

// Server başlatma
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    bot.launch().catch(console.error);
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));