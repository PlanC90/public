import express from 'express';
import { userController } from '../controllers/userController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/', asyncHandler(userController.getAllUsers));
router.get('/:username', asyncHandler(userController.getUserByUsername));
router.post('/', asyncHandler(userController.createUser));
router.put('/:username', asyncHandler(userController.updateUser));

export const userRoutes = router;