import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

// Cleanup orders older than 10 days
async function cleanupOldOrders() {
    const tenDaysAgo = Date.now() - (10 * 24 * 60 * 60 * 1000);
    const [buyOrders, sellOrders] = await Promise.all([
        fs.readFile(path.join(__dirname, 'buy.json'), 'utf8').then(JSON.parse),
        fs.readFile(path.join(__dirname, 'sell.json'), 'utf8').then(JSON.parse)
    ]);

    const updatedBuyOrders = buyOrders.filter(order => order.timestamp > tenDaysAgo);
    const updatedSellOrders = sellOrders.filter(order => order.timestamp > tenDaysAgo);

    await Promise.all([
        fs.writeFile(path.join(__dirname, 'buy.json'), JSON.stringify(updatedBuyOrders, null, 2)),
        fs.writeFile(path.join(__dirname, 'sell.json'), JSON.stringify(updatedSellOrders, null, 2))
    ]);
}

app.get('/api/orders/buy', async (req, res) => {
    try {
        const orders = await fs.readFile(path.join(__dirname, 'buy.json'), 'utf8');
        res.json(JSON.parse(orders));
    } catch (error) {
        res.status(500).json({ error: 'Error reading buy orders' });
    }
});

app.get('/api/orders/sell', async (req, res) => {
    try {
        const orders = await fs.readFile(path.join(__dirname, 'sell.json'), 'utf8');
        res.json(JSON.parse(orders));
    } catch (error) {
        res.status(500).json({ error: 'Error reading sell orders' });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const { type, username, amount, price } = req.body;
        const fileName = type === 'buy' ? 'buy.json' : 'sell.json';
        const filePath = path.join(__dirname, fileName);
        
        const orders = JSON.parse(await fs.readFile(filePath, 'utf8'));
        orders.push({
            id: uuidv4(),
            username,
            amount,
            price,
            timestamp: Date.now(),
            change: Math.floor(Math.random() * 20) + 70,
            type
        });
        
        await fs.writeFile(filePath, JSON.stringify(orders, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error creating order' });
    }
});

app.post('/api/cleanup-orders', async (req, res) => {
    try {
        await cleanupOldOrders();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error cleaning up orders' });
    }
});

// Run cleanup every day
setInterval(cleanupOldOrders, 24 * 60 * 60 * 1000);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});