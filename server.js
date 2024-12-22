import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dataRoutes from './routes/dataRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { setupBot } from './services/botService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Routes
app.use('/api', dataRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Initialize bot if token is available
const bot = setupBot();
if (bot) {
    bot.launch().catch(error => {
        console.error('Failed to launch bot:', error);
    });
}