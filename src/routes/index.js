import { userRoutes } from './userRoutes.js';
import { withdrawalRoutes } from './withdrawalRoutes.js';

export function setupRoutes(app) {
    app.use('/api/users', userRoutes);
    app.use('/api/withdrawals', withdrawalRoutes);
}