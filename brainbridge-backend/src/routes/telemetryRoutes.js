import express from 'express';
const router = express.Router();
import * as telemetryController from '../controllers/telemetryController.js';

router.post('/', telemetryController.saveTelemetry);
router.get('/:sessionId', telemetryController.getSessionTelemetry);

export default router;
