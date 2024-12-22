# MemeX Airdrop Bot

Telegram tabanlı MemeX token airdrop dağıtım botu ve yönetim paneli.

## Özellikler

- Telegram bot entegrasyonu
- Görev tabanlı token dağıtımı
- Referans sistemi
- Çekim yönetimi
- SQLite veritabanı
- Admin paneli

## Kurulum


2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun:
```env
BOT_TOKEN=your_telegram_bot_token
BOT_USERNAME=your_bot_username
PORT=3000
```

4. Veritabanını oluşturun:
```bash
npm run migrate
```

5. Uygulamayı başlatın:
```bash
npm start
```

## Glitch Deployment

1. Glitch'te yeni proje oluşturun
2. GitHub reposunu import edin
3. `.env` değişkenlerini ayarlayın
4. Otomatik olarak deploy edilecektir

## Lisans

MIT

Dahafazlası için : https://t.me/PlancSpace