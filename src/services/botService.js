import { Telegraf } from 'telegraf';
import { BOT_CONFIG } from '../config/bot.js';

export function setupBot() {
    if (!BOT_CONFIG.token) {
        console.warn('Warning: BOT_TOKEN not set. Bot features will be disabled.');
        return null;
    }

    const bot = new Telegraf(BOT_CONFIG.token);

    bot.start(async (ctx) => {
        try {
            const username = ctx.from.username || ctx.from.first_name || 'guest';
            const gameUrl = `https://t.me/${BOT_CONFIG.username}/memex?username=${username}`;

            await ctx.replyWithPhoto('https://cdn.glitch.global/41b9d177-2df3-49bd-8ecc-057b6d9aa045/1.jpg', {
                caption: `Welcome to MEMEX Game, @${username}! 🎮\n\n` +
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

    return bot;
}