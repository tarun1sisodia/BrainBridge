const express = require('express');
const router = express.Router();
const telemetryController = require('../controllers/telemetryController');

router.post('/', telemetryController.saveTelemetry);
router.get('/:sessionId', telemetryController.getSessionTelemetry);

module.exports = router;
