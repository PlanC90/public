# MemeX Airdrop Bot

Telegram tabanlı XEP token airdrop dağıtım botu ve yönetim paneli.

## 🚀 Özellikler

- Telegram bot entegrasyonu
- Görev tabanlı token dağıtımı  
- Referans sistemi
- Çekim yönetimi
- SQLite veritabanı
- Admin paneli

## 📋 Gereksinimler

- Node.js 14.x veya üzeri
- NPM 6.x veya üzeri
- SQLite3

## ⚙️ Kurulum Adımları

1. Projeyi Glitch'e import edin:
   - Glitch'te "New Project" > "Import from GitHub" seçin
   - Bu repo URL'sini yapıştırın

2. `.env` dosyasını oluşturun:
   ```env
   BOT_TOKEN=your_telegram_bot_token
   BOT_USERNAME=your_bot_username 
   PORT=3000
   ```

3. Terminal'de sırasıyla aşağıdaki komutları çalıştırın:

   ```bash
   # SQLite3 kur
   npm install sqlite3

   # Bağımlılıkları yükle
   npm install

   # Veritabanını oluştur ve tabloları kur
   npm run migrate

   # JSON verilerini SQLite'a aktar
   node db/migrations/migrateJsonToSql.js

   # Uygulamayı başlat
   npm start
   ```

## 🗄️ Veritabanı Şeması

```sql
-- Kullanıcılar tablosu
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    balance INTEGER DEFAULT 500000,
    tasks_completed TEXT DEFAULT '[]',
    referral_earnings INTEGER DEFAULT 0,
    total_referrals INTEGER DEFAULT 0,
    last_login TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Çekimler tablosu
CREATE TABLE IF NOT EXISTS withdrawals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    wallet_address TEXT NOT NULL,
    amount INTEGER NOT NULL,
    timestamp TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_withdrawals_username ON withdrawals(username);
CREATE INDEX IF NOT EXISTS idx_withdrawals_timestamp ON withdrawals(timestamp);
```

## 🔍 Veritabanı Test Arayüzü

SQLite veritabanı bağlantısını ve işlevlerini test etmek için:

1. `/public/data/sqltest.html` sayfasını açın
2. Üst kısımda veritabanı bağlantı durumunu kontrol edin:
   - 🟢 Yeşil: Bağlantı başarılı
   - 🔴 Kırmızı: Bağlantı hatası

Test arayüzünde yapabilecekleriniz:
- Kullanıcı verilerini görüntüleme
- Çekim işlemlerini görüntüleme
- Veritabanı bağlantısını test etme

## 🛠️ Sorun Giderme

1. Veritabanı bağlantı hatası:
   ```bash
   # Veritabanını yeniden oluştur
   rm -f db/database.sqlite
   npm run migrate
   node db/migrations/migrateJsonToSql.js
   ```

2. NPM paket hataları:
   ```bash
   # Node modüllerini temizle ve yeniden yükle
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Port çakışması:
   - `.env` dosyasında farklı bir port numarası belirleyin

4. SQLite hatası:
   ```bash
   # SQLite3'ü yeniden kur
   npm uninstall sqlite3
   npm install sqlite3
   ```

## 📝 Lisans

MIT

## ☕ Bağış

Kahve ısmarlamak istersen:
USDT ARB ONE Adresi: 0x876fcb6ea121a21d31748a291299ceced1ba9a23