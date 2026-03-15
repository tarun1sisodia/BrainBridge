import express from 'express';
const router = express.Router();
import * as predictionController from '../controllers/predictionController.js';

router.post('/', predictionController.runPrediction);

export default router;
