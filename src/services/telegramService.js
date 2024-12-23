const { Telegraf } = require('telegraf');
const { BOT_TOKEN } = process.env;

if (!BOT_TOKEN) {
  console.warn('Warning: BOT_TOKEN not set. Telegram features will be disabled.');
}

const bot = BOT_TOKEN ? new Telegraf(BOT_TOKEN) : null;

async function sendMessage(chatId, message, options = {}) {
  if (!bot) return;
  
  try {
    await bot.telegram.sendMessage(chatId, message, options);
  } catch (error) {
    console.error('Telegram send error:', error);
  }
}

async function notifyWithdrawal(username, amount, wallet) {
  const message = `New withdrawal request:\n\nUser: ${username}\nAmount: ${amount}\nWallet: ${wallet}`;
  // Send to admin chat/channel
  await sendMessage(process.env.ADMIN_CHAT_ID, message);
}

module.exports = {
  bot,
  sendMessage,
  notifyWithdrawal
};