const Session = require('../models/Session');

exports.createSession = async (req, res) => {
  try {
    const { child_id, language } = req.body;
    if (!child_id) {
      return res.status(400).json({ error: 'child_id is required' });
    }
    const session = await Session.create({ child_id, language });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Error creating session' });
  }
};

exports.getSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching session' });
  }
};

exports.updateSessionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const session = await Session.findByIdAndUpdate(id, { status }, { new: true });
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Error updating session' });
  }
};
