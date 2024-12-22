const express = require('express');
const { getDb } = require('../config/database');
const router = express.Router();

// Veritabanı sağlık kontrolü
router.get('/health', async (req, res) => {
    try {
        const db = await getDb();
        await db.get('SELECT 1'); // Test sorgusu
        res.json({ success: true, message: 'Veritabanı bağlantısı başarılı' });
    } catch (error) {
        console.error('Veritabanı bağlantı hatası:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Veritabanı bağlantı hatası',
            details: error.message 
        });
    }
});

// Kullanıcıları getir
router.get('/users', async (req, res) => {
    try {
        const db = await getDb();
        const users = await db.all('SELECT * FROM users ORDER BY created_at DESC');
        res.json({ success: true, data: users });
    } catch (error) {
        console.error('Kullanıcı verilerini getirme hatası:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Kullanıcı verilerini getirme hatası',
            details: error.message 
        });
    }
});

// Çekimleri getir
router.get('/withdrawals', async (req, res) => {
    try {
        const db = await getDb();
        const withdrawals = await db.all('SELECT * FROM withdrawals ORDER BY timestamp DESC');
        res.json({ success: true, data: withdrawals });
    } catch (error) {
        console.error('Çekim verilerini getirme hatası:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Çekim verilerini getirme hatası',
            details: error.message 
        });
    }
});

module.exports = router;