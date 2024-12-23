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

### 1. Replit Projesi Oluşturma

1. [Replit](https://replit.com)'e giriş yapın
2. "Create Repl" butonuna tıklayın
3. "Import from GitHub" seçeneğini seçin:
   - Repository URL: `https://github.com/PlanC90/public.git`
   - Language: Node.js
   - "Import from GitHub" butonuna tıklayın

### 2. Telegram Bot Oluşturma

1. Telegram'da [@BotFather](https://t.me/BotFather)'a gidin
2. `/newbot` komutunu gönderin
3. Bot için bir isim ve kullanıcı adı belirleyin
4. BotFather'ın verdiği API token'ı kaydedin

### 3. Replit Secrets Ayarları

1. Sol menüden "Tools" > "Secrets" seçin
2. "New Secret" butonuna tıklayın ve şu değişkenleri ekleyin:
   ```
   BOT_TOKEN=your_telegram_bot_token
   BOT_USERNAME=your_bot_username
   PORT=3000
   ```

### 4. Veritabanı Kurulumu

Shell'de sırasıyla şu komutları çalıştırın:

```bash
# Bağımlılıkları yükle
npm install

# Veritabanını oluştur
npm run migrate

# JSON verilerini SQLite'a aktar
node db/migrations/migrateJsonToSql.js
```

### 5. Projeyi Başlatma

"Run" butonuna tıklayın veya Shell'de şu komutu çalıştırın:
```bash
npm start
```

### 6. Always On Ayarı (Opsiyonel)

Botunuzun 24/7 çalışması için:
1. Sol menüden "Tools" seçin
2. "Always On" özelliğini aktif edin

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

5. Replit Console Hataları:
- "Stop" butonuna tıklayın
- Shell'i temizleyin: `clear`
- Yeniden başlatın: `npm start`

## 📝 Lisans

MIT

## ☕ Bağış

USDT ARB ONE: 0x876fcb6ea121a21d31748a291299ceced1ba9a23