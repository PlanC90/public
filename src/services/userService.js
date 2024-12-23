const { userRepository } = require('../repositories/userRepository');
const { validateUsername } = require('../utils/validators');

const userService = {
    async getAllUsers() {
        return await userRepository.getAll();
    },

    async findByUsername(username) {
        validateUsername(username);
        return await userRepository.findByUsername(username);
    },

    async createUser(userData) {
        validateUsername(userData.username);
        return await userRepository.create(userData);
    },

    async updateUser(username, data) {
        validateUsername(username);
        return await userRepository.update(username, data);
    }
};

module.exports = { userService };