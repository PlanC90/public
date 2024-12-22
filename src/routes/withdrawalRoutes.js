import express from 'express';
import { withdrawalController } from '../controllers/withdrawalController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/', asyncHandler(withdrawalController.getAllWithdrawals));
router.get('/:username', asyncHandler(withdrawalController.getUserWithdrawals));
router.post('/', asyncHandler(withdrawalController.createWithdrawal));

export const withdrawalRoutes = router;