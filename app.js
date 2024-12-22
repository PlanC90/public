const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Public klasörünü statik dosyalar için kullanıyoruz
app.use(express.static(path.join(__dirname, 'public')));

// Kullanıcıları JSON dosyasından çekip, frontend'e gönderecek bir route
app.get('/data/users.json', (req, res) => {
    fs.readFile(path.join(__dirname, 'public/data/users.json'), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Veri okunurken hata oluştu!');
        }
        res.json(JSON.parse(data)); // JSON formatında yanıt gönder
    });
});

// Sunucuyu başlatıyoruz
app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
