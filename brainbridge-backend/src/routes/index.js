import express from 'express';
import sessionRoutes from './sessionRoutes.js';
import telemetryRoutes from './telemetryRoutes.js';
import predictionRoutes from './predictionRoutes.js';
import authRoutes from './authRoutes.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.use('/auth', authRoutes);
router.use('/sessions', sessionRoutes);
router.use('/telemetry', telemetryRoutes);
router.use('/predict', predictionRoutes);

export default router;
