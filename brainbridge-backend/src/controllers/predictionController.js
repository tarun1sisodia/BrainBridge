const axios = require('axios');
const Result = require('../models/Result');
const Session = require('../models/Session');
const Telemetry = require('../models/Telemetry');

exports.runPrediction = async (req, res) => {
  try {
    const { session_id } = req.body;
    
    if (!session_id) {
      return res.status(400).json({ error: 'session_id is required' });
    }

    // 1. Fetch telemetry for this session
    const telemetryData = await Telemetry.find({ session_id });
    
    if (!telemetryData || telemetryData.length === 0) {
      return res.status(400).json({ error: 'No telemetry data found for this session' });
    }

    // 2. Aggregate features for ML Service
    // In a real app, this logic might be more complex
    let totalReactionTime = 0;
    let totalErrors = 0;
    let count = 0;
    
    telemetryData.forEach(t => {
      if (t.reaction_time) totalReactionTime += t.reaction_time;
      if (t.errors) totalErrors += t.errors;
      count++;
    });

    const reaction_time_avg = count > 0 ? totalReactionTime / count : 0;
    const error_rate = count > 0 ? totalErrors / count : 0; // Simplified
    
    const features = {
      reaction_time_avg,
      error_rate,
      math_accuracy: 0.8, // placeholder
      mirror_error_rate: 0.2 // placeholder
    };

    // 3. Call ML Service
    const mlResponse = await axios.post(`${process.env.ML_SERVICE_URL}/predict`, features);
    
    // 4. Save results
    const result = await Result.create({
      session_id,
      adhd_risk: mlResponse.data.adhd_risk,
      dyslexia_risk: mlResponse.data.dyslexia_risk,
      dyscalculia_risk: mlResponse.data.dyscalculia_risk
    });

    // Mark session completed
    await Session.findByIdAndUpdate(session_id, { status: 'completed' });

    res.status(200).json(result);
  } catch (error) {
    console.error('Prediction Error:', error.message);
    res.status(500).json({ error: 'Error running prediction' });
  }
};
