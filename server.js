import express from 'express';
import serveStatic from 'serve-static';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Serve static files from public directory
app.use(serveStatic(join(__dirname, 'public')));
app.use('/src', serveStatic(join(__dirname, 'src')));
app.use('/images', serveStatic(join(__dirname, 'images')));

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});