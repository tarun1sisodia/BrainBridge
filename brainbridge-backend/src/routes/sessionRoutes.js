const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.post('/', sessionController.createSession);
router.get('/:id', sessionController.getSession);
router.patch('/:id/status', sessionController.updateSessionStatus);

module.exports = router;
