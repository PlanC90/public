import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs/promises';
import path from 'path';

const token = '7700368269:AAH_Yyk9tTQgsHWukRDGeAZG71d17irW4R8';
const bot = new TelegramBot(token, { polling: true });

const LINKS_FILE = path.join(process.cwd(), 'data', 'links.json');
const GROUPS_FILE = path.join(process.cwd(), 'data'), { recursive: true });

// Initialize files if they don't exist
try {
  await fs.access(LINKS_FILE);
} catch {
  await fs.writeFile(LINKS_FILE, JSON.stringify([]));
}

try {
  await fs.access(GROUPS_FILE);
} catch {
  await fs.writeFile(GROUPS_FILE, JSON.stringify([]));
}

const detectPlatform = (url) => {
  const hostname = new URL(url).hostname;
  if (hostname.includes('twitter.com')) return 'Twitter';
  if (hostname.includes('facebook.com')) return 'Facebook';
  if (hostname.includes('reddit.com')) return 'Reddit';
  if (hostname.includes('instagram.com')) return 'Instagram';
  return 'Other';
};

bot.on('message', async (msg) => {
  // Extract URLs from message
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = msg.text?.match(urlRegex);

  if (urls) {
    const linksData = JSON.parse(await fs.readFile(LINKS_FILE, 'utf8'));
    const groupsData = JSON.parse(await fs.readFile(GROUPS_FILE, 'utf8'));

    for (const url of urls) {
      const platform = detectPlatform(url);
      const linkData = {
        username: msg.from.username,
        platform,
        timestamp: new Date().toISOString(),
        url,
        groupId: msg.chat.id,
        groupName: msg.chat.title,
        completed: false,
        supporters: []
      };

      linksData.push(linkData);

      // Send notification to all groups
      for (const group of groupsData) {
        const supportButton = {
          inline_keyboard: [[
            { text: `✅ ${platform} Görevi Destekle`, callback_data: `support_${linksData.length - 1}` }
          ]]
        };

        // Send the photo first
        await bot.sendPhoto(group.id, 'https://memex.planc.space/images/gorselb.jpg', {
          caption: `@${msg.from.username}, ${platform} üzerinde bir link paylaştı!\nLütfen destek olalım.\n\nLink: ${url}`,
          reply_markup: supportButton
        });
      }
    }

    await fs.writeFile(LINKS_FILE, JSON.stringify(linksData, null, 2));
  }
});

// Handle group additions
bot.on('new_chat_members', async (msg) => {
  if (msg.new_chat_member.id === bot.options.id) {
    const groupsData = JSON.parse(await fs.readFile(GROUPS_FILE, 'utf8'));
    
    if (!groupsData.find(g => g.id === msg.chat.id)) {
      groupsData.push({
        id: msg.chat.id,
        name: msg.chat.title,
        joinedAt: new Date().toISOString()
      });
      
      await fs.writeFile(GROUPS_FILE, JSON.stringify(groupsData, null, 2));
      
      await bot.sendMessage(
        msg.chat.id,
        'Merhaba! Ben Link Takip Botuyum. Paylaşılan linkleri takip edip raporlayacağım.'
      );
    }
  }
});

// Handle support button clicks
bot.on('callback_query', async (callbackQuery) => {
  const linkIndex = parseInt(callbackQuery.data.split('_')[1]);
  const linksData = JSON.parse(await fs.readFile(LINKS_FILE, 'utf8'));
  
  if (!linksData[linkIndex].supporters.includes(callbackQuery.from.username)) {
    linksData[linkIndex].supporters.push(callbackQuery.from.username);
    await fs.writeFile(LINKS_FILE, JSON.stringify(linksData, null, 2));
    
    await bot.answerCallbackQuery(callbackQuery.id, {
      text: 'Desteğiniz için teşekkürler! 🎉'
    });
  } else {
    await bot.answerCallbackQuery(callbackQuery.id, {
      text: 'Bu görevi zaten desteklediniz!'
    });
  }
});
