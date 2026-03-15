const Telemetry = require('../models/Telemetry');

exports.saveTelemetry = async (req, res) => {
  try {
    const { session_id, game, reaction_time, errors, completion_time, additional_metrics } = req.body;
    
    if (!session_id || !game) {
      return res.status(400).json({ error: 'session_id and game are required' });
    }

    const telemetry = await Telemetry.create({
      session_id,
      game,
      reaction_time,
      errors,
      completion_time,
      additional_metrics
    });

    res.status(201).json(telemetry);
  } catch (error) {
    res.status(500).json({ error: 'Error saving telemetry' });
  }
};

exports.getSessionTelemetry = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const telemetry = await Telemetry.find({ session_id: sessionId });
    res.status(200).json(telemetry);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching telemetry' });
  }
};
