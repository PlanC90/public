const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { setupRoutes } = require('./src/routes');
const { errorHandler } = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Setup routes
setupRoutes(app);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});