import mongoose from 'mongoose';

const telemetrySchema = new mongoose.Schema({
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  game: { type: String, required: true },
  reaction_time: { type: Number },
  errors: { type: Number },
  completion_time: { type: Number },
  additional_metrics: { type: Map, of: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

export default mongoose.model('Telemetry', telemetrySchema);
