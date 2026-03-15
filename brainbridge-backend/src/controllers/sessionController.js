import Session from '../models/Session.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { BadRequestError, NotFoundError } from '../utils/customErrors.js';

export const createSession = async (req, res) => {
  try {
    const { child_id, language } = req.body;
    if (!child_id) {
      throw new BadRequestError('child_id is required');
    }
    const session = await Session.create({ child_id, language });
    return successResponse(res, session, 'Session created successfully', 201);
  } catch (error) {
    return errorResponse(res, error.message || 'Error creating session', error.statusCode || 500);
  }
};

export const getSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id);
    if (!session) {
      throw new NotFoundError('Session not found');
    }
    return successResponse(res, session);
  } catch (error) {
    return errorResponse(res, error.message || 'Error fetching session', error.statusCode || 500);
  }
};

export const updateSessionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const session = await Session.findByIdAndUpdate(id, { status }, { new: true });
    if (!session) {
      throw new NotFoundError('Session not found');
    }
    return successResponse(res, session, 'Session status updated');
  } catch (error) {
    return errorResponse(res, error.message || 'Error updating session', error.statusCode || 500);
  }
};
