const express = require('express');
const { userController } = require('../controllers/userController');
const { asyncHandler } = require('../middleware/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(userController.getAllUsers));
router.get('/:username', asyncHandler(userController.getUserByUsername));
router.post('/', asyncHandler(userController.createUser));
router.put('/:username', asyncHandler(userController.updateUser));

module.exports = { userRoutes: router };