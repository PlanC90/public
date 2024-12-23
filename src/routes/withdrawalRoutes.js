const express = require('express');
const { withdrawalController } = require('../controllers/withdrawalController');
const { asyncHandler } = require('../middleware/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(withdrawalController.getAllWithdrawals));
router.get('/:username', asyncHandler(withdrawalController.getUserWithdrawals));
router.post('/', asyncHandler(withdrawalController.createWithdrawal));

module.exports = { withdrawalRoutes: router };