import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  child_id: { type: String, required: true },
  language: { type: String, default: 'en' },
  status: { type: String, enum: ['in_progress', 'completed', 'abandoned'], default: 'in_progress' }
}, { timestamps: true });

export default mongoose.model('Session', sessionSchema);
