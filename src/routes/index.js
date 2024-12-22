const { userRoutes } = require('./userRoutes');
const { withdrawalRoutes } = require('./withdrawalRoutes');

function setupRoutes(app) {
    app.use('/api/users', userRoutes);
    app.use('/api/withdrawals', withdrawalRoutes);
}

module.exports = { setupRoutes };