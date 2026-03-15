import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  adhd_risk: { type: Number, required: true },
  dyslexia_risk: { type: Number, required: true },
  dyscalculia_risk: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Result', resultSchema);
