# MemeX Airdrop Bot

Telegram tabanlı XEP token airdrop dağıtım botu ve yönetim paneli.

## 🚀 Özellikler

- Telegram bot entegrasyonu
- Görev tabanlı token dağıtımı  
- Referans sistemi
- Çekim yönetimi
- PostgreSQL veritabanı
- Admin paneli

## 📋 Replit Kurulum Adımları

### 1. Replit Projesi Oluşturma

1. [Replit](https://replit.com)'e giriş yapın
2. "Create Repl" butonuna tıklayın
3. "Import from GitHub" seçeneğini seçin:
   - Repository URL: `https://github.com/PlanC90/public.git`
   - Language: Node.js
   - "Import from GitHub" butonuna tıklayın

### 2. PostgreSQL Veritabanı Kurulumu

1. [Neon](https://neon.tech) veya [ElephantSQL](https://www.elephantsql.com/)'a üye olun
2. Yeni bir PostgreSQL veritabanı oluşturun
3. Veritabanı bağlantı URL'sini kaydedin

### 3. Replit Secrets Ayarları

1. Sol menüden "Tools" > "Secrets" seçin
2. "New Secret" butonuna tıklayın ve şu değişkenleri ekleyin:
   ```
   BOT_TOKEN=your_telegram_bot_token
   BOT_USERNAME=your_bot_username
   DATABASE_URL=your_postgres_connection_url
   PORT=3000
   ```

### 4. Bağımlılıkları Yükleme

Shell'de şu komutu çalıştırın:
```bash
npm install
```

### 5. Veritabanı Tabloları Oluşturma

Shell'de şu komutları çalıştırın:
```bash
# Veritabanı tablolarını oluştur
npm run migrate

# JSON verilerini PostgreSQL'e aktar
npm run migrate:json
```

### 6. Projeyi Başlatma

"Run" butonuna tıklayın veya Shell'de şu komutu çalıştırın:
```bash
npm start
```

### 7. Always On Ayarı (Opsiyonel)

Botunuzun 24/7 çalışması için:
1. Sol menüden "Tools" seçin
2. "Always On" özelliğini aktif edin

## 🛠️ Sorun Giderme

1. Veritabanı Bağlantı Hatası:
- DATABASE_URL'in doğru olduğunu kontrol edin
- Veritabanı servisinin aktif olduğunu kontrol edin
- SSL ayarlarını kontrol edin

2. NPM Hataları:
```bash
rm -rf node_modules package-lock.json
npm install
```

3. Port Hatası:
- Replit Secrets'da PORT değerini kontrol edin

4. Bot Token Hatası:
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