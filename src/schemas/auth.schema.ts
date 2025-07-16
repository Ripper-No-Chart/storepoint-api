import { USER_ROLES } from '@/constants/user.constants';
import { validatePassword } from '@/utils/password.util';
import { zObjectId } from '@/utils/zod.util';
import { z } from 'zod';

/**
 * Zod schema for user registration input.
 *
 * @description
 * -> Validates name, email, password, and role for registration.
 * -> Password must pass custom validator (min 6 characters).
 * -> Role must match predefined enum.
 *
 * @fields
 * -> name: string (required, non-empty)
 * -> email: string (required, valid format)
 * -> password: string (required, validated)
 * -> role: enum (USER_ROLES, required)
 */
export const registerSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name cannot be empty'),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
  password: z.string({ required_error: 'Password is required' }).refine(validatePassword, {
    message: 'Password must be at least 6 characters'
  }),
  role: z.enum(USER_ROLES as [string, ...string[]], {
    required_error: 'Role is required'
  })
});

/**
 * Zod schema for user login input.
 *
 * @description
 * -> Validates email and password for authentication.
 * -> Ensures password passes minimum length requirement.
 *
 * @fields
 * -> email: string (required, valid format)
 * -> password: string (required, validated)
 */
export const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
  password: z.string({ required_error: 'Password is required' }).refine(validatePassword, {
    message: 'Password must be at least 6 characters'
  })
});

/**
 * Zod schema for authenticated user payload.
 *
 * @description
 * -> Validates the structure of a user object extracted from JWT.
 * -> Ensures type safety and correct format (_id, name).
 *
 * @fields
 * -> _id: ObjectId (required)
 * -> name: string (required, non-empty)
 */
export const authUserSchema = z.object({
  _id: zObjectId(),
  name: z.string({ required_error: 'User name is required' }).min(1, 'User name cannot be empty')
});
