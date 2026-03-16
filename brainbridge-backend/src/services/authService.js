import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { BadRequestError, UnauthorizedError } from '../utils/customErrors.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d',
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const register = async (userData) => {
  const { username, email, password } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new BadRequestError('User already exists with this email or username');
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });

  return newUser;
};

export const login = async (email, password) => {
  // 1) Check if email and password exist
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new UnauthorizedError('Incorrect email or password');
  }

  return user;
};

export default {
  register,
  login,
  createSendToken,
};
