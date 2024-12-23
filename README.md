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

1. Replit'te yeni proje oluşturun:
   - "Create Repl" butonuna tıklayın
   - "Import from GitHub" seçeneğini seçin
   - Repository URL: `https://github.com/PlanC90/public.git`
   - Language: Node.js
   - "Import from GitHub" butonuna tıklayın

2. Secrets (Environment Variables) ayarları:
   - Sol menüden "Tools" > "Secrets" seçin
   - Aşağıdaki değişkenleri ekleyin:
     ```
     BOT_TOKEN=your_telegram_bot_token
     BOT_USERNAME=your_bot_username
     PORT=3000
     ```

3. Projeyi başlatın:
   - "Run" butonuna tıklayın veya Shell'de şu komutu çalıştırın:
     ```bash
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

3. Port hatası:
- Replit Secrets'da PORT değerini kontrol edin

4. Bot Token hatası:
- Replit Secrets'da BOT_TOKEN değerini kontrol edin
- @BotFather'dan yeni token alın

## 📝 Lisans

MIT

## ☕ Bağış

USDT ARB ONE: 0x876fcb6ea121a21d31748a291299ceced1ba9a23