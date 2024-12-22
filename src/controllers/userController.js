import { userService } from '../../db/services/userService.js';

export const userController = {
    async getAllUsers(req, res) {
        const users = await userService.getAllUsers();
        res.json(users);
    },

    async getUserByUsername(req, res) {
        const user = await userService.findByUsername(req.params.username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    },

    async createUser(req, res) {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    },

    async updateUser(req, res) {
        const user = await userService.updateUser(req.params.username, req.body);
        res.json(user);
    }
};