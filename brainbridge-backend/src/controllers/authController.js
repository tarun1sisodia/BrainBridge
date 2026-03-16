import authService from '../services/authService.js';

// Helper to catch async errors - if catchAsync is not globally available
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export const syncUser = catchAsync(async (req, res, next) => {
  const user = await authService.syncUser(req.body);
  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

export default {
  syncUser,
};


