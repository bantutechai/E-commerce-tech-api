const { z } = require('zod');
const { ALL_ROLES } = require('../constants/roles');

const registerSchema = z.object({
  body: z.object({
    fullName: z
      .string({ required_error: 'Full name is required' })
      .min(3, 'Full name must be at least 3 characters long')
      .max(100, 'Full name cannot exceed 100 characters')
      .trim(),
    email: z
      .string({ required_error: 'Email address is required' })
      .email('Invalid email address format')
      .trim()
      .toLowerCase(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters long')
      .max(72, 'Password cannot exceed 72 characters')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    role: z
      .enum(ALL_ROLES, { errorMap: () => ({ message: 'Invalid user role specified' }) })
      .optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email address is required' })
      .email('Invalid email address format')
      .trim()
      .toLowerCase(),
    password: z
      .string({ required_error: 'Password is required' }),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
