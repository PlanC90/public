# MemeX Airdrop Bot

Telegram tabanlı XEP token airdrop dağıtım botu ve yönetim paneli.

## Özellikler

- Telegram bot entegrasyonu
- Görev tabanlı token dağıtımı  
- Referans sistemi
- Çekim yönetimi
- SQLite veritabanı
- Admin paneli

## Glitch Kurulum

1. Yeni Glitch projesi oluşturun ve bu repoyu import edin

2. Gerekli paketleri package.json'a ekleyin:

```json
{
  "dependencies": {
    "body-parser": "^1.20.2",
    "cors": "^2.8.5", 
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "sqlite": "^5.1.1",
    "sqlite3": "^5.1.7",
    "telegraf": "^4.16.3"
  }
}
```

3. .env dosyasını oluşturun:

```env
BOT_TOKEN=your_telegram_bot_token
BOT_USERNAME=your_bot_username 
PORT=3000
```

4. Terminal'de SQLite ve veritabanını kurun:

```bash
# SQLite3 kur
npm install sqlite3 sqlite

# Veritabanını oluştur
npm run migrate
```

5. Uygulamayı başlat:

```bash
npm start
```

## API Endpoints

- `GET /api/users` - Tüm kullanıcıları listele
- `GET /api/users/:username` - Kullanıcı detayı
- `POST /api/users` - Yeni kullanıcı oluştur
- `PUT /api/users/:username` - Kullanıcı güncelle
- `GET /api/withdrawals` - Tüm çekimleri listele
- `POST /api/withdrawals` - Yeni çekim oluştur

## Veritabanı Şeması

```sql
-- users tablosu
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  balance INTEGER DEFAULT 500000,
  tasks_completed TEXT DEFAULT '[]',
  referral_earnings INTEGER DEFAULT 0,
  total_referrals INTEGER DEFAULT 0,
  last_login TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- withdrawals tablosu  
CREATE TABLE withdrawals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  wallet_address TEXT NOT NULL, 
  amount INTEGER NOT NULL,
  timestamp TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Lisans

MIT

Kahve ısmarlamak istersen: USDT ARB ONE Adresi //  0x876fcb6ea121a21d31748a291299ceced1ba9a23