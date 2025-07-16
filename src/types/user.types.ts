import { z } from 'zod';

import { userCreateSchema, userDeleteSchema, userEditSchema } from '@/schemas/user.schema';

/**
 * Payload for creating a user.
 *
 * @description
 * -> Uses Zod schema to infer the user creation payload structure.
 * -> Ensures valid user creation data format (name, email, password, role).
 */
export type UserCreateInput = z.infer<typeof userCreateSchema>;

/**
 * Payload for deleting a user by ID.
 *
 * @description
 * -> Uses Zod schema to infer the user deletion payload structure.
 * -> Ensures valid user ID format for deletion.
 */
export type UserDeletePayload = z.infer<typeof userDeleteSchema>;

/**
 * Payload for editing user details.
 *
 * @description
 * -> Uses Zod schema to infer the user edit payload structure.
 * -> Ensures valid user edit data format (name, email, password, role).
 */
export type UserEditInput = z.infer<typeof userEditSchema>;
