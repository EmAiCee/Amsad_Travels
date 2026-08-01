import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  email: Joi.string().required().email(),
  phone: Joi.string().required().pattern(/^[0-9]{7,15}$/).messages({
    'string.pattern.base': 'Phone number must be 7-15 digits'
  }),
  password: Joi.string().required().min(8).max(30).messages({
    'string.min': 'Password must be at least 8 characters long'
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords do not match'
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});