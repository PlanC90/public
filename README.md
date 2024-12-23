# MemeX Airdrop Bot

Telegram tabanlı XEP token airdrop dağıtım botu ve yönetim paneli.

## 🚀 Özellikler

- Telegram bot entegrasyonu
- Görev tabanlı token dağıtımı  
- Referans sistemi
- Çekim yönetimi
- SQLite veritabanı
- Admin paneli

## 📋 Replit Kurulum Adımları

1. Replit'te yeni bir proje oluşturun:
   - "Create Repl" > "Import from GitHub"
   - Repository URL: `https://github.com/PlanC90/public.git`
   - Language: Node.js

2. `.env` dosyasını oluşturun:
```env
BOT_TOKEN=your_telegram_bot_token
BOT_USERNAME=your_bot_username 
PORT=3000
```

3. Shell'de sırasıyla çalıştırın:

```bash
# Bağımlılıkları yükle
npm install

# Veritabanını oluştur
npm run migrate

# JSON verilerini SQLite'a aktar
node db/migrations/migrateJsonToSql.js

# Uygulamayı başlat
npm start
```

## 🔍 Veritabanı Test Arayüzü

SQLite veritabanı bağlantısını test etmek için:
- `/public/data/sqltest.html` sayfasını açın
- Bağlantı durumunu kontrol edin:
  - 🟢 Yeşil: Bağlantı başarılı
  - 🔴 Kırmızı: Bağlantı hatası

## 🛠️ Sorun Giderme

1. Veritabanı hatası:
```bash
rm -f db/database.sqlite
npm run migrate
node db/migrations/migrateJsonToSql.js
```

2. NPM hataları:
```bash
rm -rf node_modules package-lock.json
npm install
```

3. Port çakışması:
- `.env` dosyasında farklı port belirleyin

4. SQLite hatası:
```bash
npm uninstall sqlite3
npm install sqlite3
```

## 📝 Lisans

MIT

## ☕ Bağış

USDT ARB ONE: 0x876fcb6ea121a21d31748a291299ceced1ba9a23