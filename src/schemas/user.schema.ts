import { USER_ROLES } from '@/constants/user.constants';
import { validatePassword } from '@/utils/password.util';
import { zObjectId } from '@/utils/zod.util';
import { z } from 'zod';

/**
 * Zod schema for creating a user.
 *
 * @description
 * -> Validates name, email, password (min 6), and role.
 *
 * @fields
 * -> name: string (required)
 * -> email: valid email string (required)
 * -> password: string (min 6 chars, required)
 * -> role: enum USER_ROLES (required)
 */
export const userCreateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().refine(validatePassword, {
    message: 'Password must be at least 6 characters'
  }),
  role: z.enum(USER_ROLES as [string, ...string[]])
});

/**
 * Zod schema for deleting a user.
 *
 * @description
 * -> Validates the _id for deletion.
 *
 * @fields
 * -> _id: ObjectId (validated via zObjectId)
 */
export const userDeleteSchema = z.object({
  _id: zObjectId()
});

/**
 * Zod schema for editing a user.
 *
 * @description
 * -> Validates fields allowed for update.
 * -> _id is required. Others are optional.
 *
 * @fields
 * -> _id: ObjectId (validated via zObjectId)
 * -> name: string (optional)
 * -> email: string (valid email, optional)
 * -> password: string (min 6 chars, optional)
 * -> role: enum USER_ROLES (optional)
 */
export const userEditSchema = z.object({
  _id: zObjectId(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .refine(validatePassword, {
      message: 'Password must be at least 6 characters'
    })
    .optional(),
  role: z.enum(USER_ROLES as [string, ...string[]]).optional()
});
