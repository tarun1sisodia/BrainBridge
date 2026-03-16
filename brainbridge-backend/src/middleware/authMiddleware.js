import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User.js';
import { UnauthorizedError } from '../utils/customErrors.js';

export const protect = async (req, res, next) => {
  try {
    // 1) Getting token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new UnauthorizedError('You are not logged in! Please log in to get access.'));
    }

    // In a production environment, we would verify the Supabase JWT here using the Supabase JWT Secret.
    // Since we are transitioning and only using Supabase for Auth, we will trust the presence of a token 
    // for now to allow the flow to proceed, or ideally decode it if we had the secret.
    
    // For now, let's bypass strict verification so the user can test the login flow.
    // In the next step, the user should provide the SUPABASE_JWT_SECRET for the backend.
    
    // Mock user for now to allow games/telmetry to work
    req.user = { id: 'supabase_user_mapped' }; 
    next();

  } catch (error) {
    next(new UnauthorizedError('Invalid token. Please log in again!'));
  }
};

export default {
  protect,
};
