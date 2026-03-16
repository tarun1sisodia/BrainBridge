import express from 'express';
import { syncUser } from '../controllers/authController.js';
import { syncSchema } from '../validators/authValidator.js';


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

router.post('/sync', validate(syncSchema), syncUser);


export default router;

