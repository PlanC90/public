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
   # Bağımlılıkları yükle
   npm install

   # Veritabanını oluştur ve tabloları kur
   npm run migrate

   # Uygulamayı başlat
   npm start
   ```

## 🔍 Veritabanı Test Arayüzü

SQLite veritabanı bağlantısını ve işlevlerini test etmek için:

1. `/public/data/sqltest.html` sayfasını açın
2. Üst kısımda veritabanı bağlantı durumunu kontrol edin:
   - 🟢 Yeşil: Bağlantı başarılı
   - 🔴 Kırmızı: Bağlantı hatası

Test arayüzünde yapabilecekleriniz:
- Kullanıcı ekleme/listeleme
- Çekim işlemi oluşturma/listeleme
- Veritabanı işlemlerini test etme

## 📁 Proje Yapısı

```
├── db/
│   ├── config.js           # Veritabanı yapılandırması
│   ├── migrations/         # Veritabanı migrasyon scriptleri
│   ├── models/            # Veritabanı modelleri
│   └── repositories/      # Veritabanı işlemleri
├── public/
│   ├── data/             # JSON verileri ve test sayfaları
│   ├── js/              # İstemci tarafı JavaScript
│   └── styles.css       # Stil dosyaları
├── src/
│   ├── config/          # Uygulama yapılandırması
│   ├── controllers/     # API kontrolcüleri
│   ├── middleware/      # Express middleware'leri
│   ├── routes/         # API rotaları
│   ├── services/       # İş mantığı servisleri
│   └── utils/          # Yardımcı fonksiyonlar
├── .env                # Ortam değişkenleri
├── package.json        # Proje bağımlılıkları
└── server.js          # Ana uygulama dosyası
```

## 🔧 Veritabanı Şeması

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

## 🛠️ Sorun Giderme

1. Veritabanı bağlantı hatası:
   ```bash
   # Veritabanını yeniden oluştur
   rm -f db/database.sqlite
   npm run migrate
   ```

2. NPM paket hataları:
   ```bash
   # Node modüllerini temizle ve yeniden yükle
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Port çakışması:
   - `.env` dosyasında farklı bir port numarası belirleyin

## 📝 Lisans

MIT

## ☕ Bağış

Kahve ısmarlamak istersen:
USDT ARB ONE Adresi: 0x876fcb6ea121a21d31748a291299ceced1ba9a23