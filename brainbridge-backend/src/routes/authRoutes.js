import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';

const router = express.Router();

// Validation middleware
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message,
    });
  }
  next();
};

router.post('/register', validate(registerSchema), signup);
router.post('/login', validate(loginSchema), login);

export default router;
