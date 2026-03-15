import express from 'express';
const router = express.Router();
import * as sessionController from '../controllers/sessionController.js';

router.post('/', sessionController.createSession);
router.get('/:id', sessionController.getSession);
router.patch('/:id/status', sessionController.updateSessionStatus);

export default router;
