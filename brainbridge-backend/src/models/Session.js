const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  child_id: { type: String, required: true },
  language: { type: String, default: 'en' },
  status: { type: String, enum: ['in_progress', 'completed', 'abandoned'], default: 'in_progress' }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
