import { Telegraf } from 'telegraf';
import { BOT_CONFIG } from '../config/bot.js';
import { handleStart } from './botCommands.js';

export function setupBot() {
  if (!BOT_CONFIG.token) {
    console.warn('Warning: BOT_TOKEN not set in environment variables. Bot features will be disabled.');
    return null;
  }

  try {
    const bot = new Telegraf(BOT_CONFIG.token);
    
    // Register command handlers
    bot.command('start', handleStart);
    
    // Error handling
    bot.catch((err, ctx) => {
      console.error('Bot error:', err);
      ctx.reply('Sorry, something went wrong. Please try again later.');
    });

    return bot;
  } catch (error) {
    console.error('Failed to initialize bot:', error);
    return null;
  }
}