import Joi from 'joi';

export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const syncSchema = Joi.object({
  supabase_id: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().allow('', null),
});

export default {
  registerSchema,
  loginSchema,
  syncSchema,
};

