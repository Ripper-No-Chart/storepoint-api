import z from 'zod';

import { authUserSchema, loginSchema, registerSchema } from '@/schemas/auth.schema';

/**
 * Payload for user registration.
 *
 * @description
 * -> Uses Zod schema to infer the registration payload structure.
 * -> Ensures valid registration data format (name, email, password, role).
 */
export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Payload for user login.
 *
 * @description
 * -> Uses Zod schema to infer the login payload structure.
 * -> Ensures valid login data format (email, password).
 */
export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Inferred TypeScript type from `authUserSchema`.
 *
 * @description
 * -> Used by `request.user` via authentication middleware.
 * -> Ensures strong typing and validation for JWT user payload.
 */
export type AuthUser = z.infer<typeof authUserSchema>;
