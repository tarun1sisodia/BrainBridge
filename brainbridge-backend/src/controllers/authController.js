import authService from '../services/authService.js';

// Helper to catch async errors - if catchAsync is not globally available
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await authService.register(req.body);
  authService.createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  authService.createSendToken(user, 200, res);
});

export default {
  signup,
  login,
};
