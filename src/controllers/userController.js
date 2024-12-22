const { userService } = require('../services/userService');
const { formatSuccess, formatError } = require('../utils/responseFormatter');

const userController = {
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(formatSuccess(users));
        } catch (error) {
            res.status(500).json(formatError(error));
        }
    },

    async getUserByUsername(req, res) {
        try {
            const user = await userService.findByUsername(req.params.username);
            if (!user) {
                return res.status(404).json(formatError({ message: 'User not found' }, 404));
            }
            res.json(formatSuccess(user));
        } catch (error) {
            res.status(500).json(formatError(error));
        }
    },

    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(formatSuccess(user));
        } catch (error) {
            res.status(500).json(formatError(error));
        }
    },

    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.params.username, req.body);
            res.json(formatSuccess(user));
        } catch (error) {
            res.status(500).json(formatError(error));
        }
    }
};

module.exports = { userController };