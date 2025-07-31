import { userCreateSchema, userDeleteSchema, userEditSchema } from '@/schemas/user.schema';
import * as userService from '@/services/user.service';
import { UserCreateInput, UserDeletePayload, UserEditInput } from '@/types/user.types';
import { sendSuccess } from '@/utils/response.util';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Lists all users.
 *
 * @route POST /api/users/list_users
 * @access Private (admin)
 *
 * @description
 * -> Fetches all users from the database.
 * -> Responds with an array of UserDocument.
 *
 * @fields
 * -> none – This endpoint does not require any input fields.
 */
export const listUsers = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  sendSuccess(reply, await userService.listUsers());
};

/**
 * Creates a new user.
 *
 * @route POST /api/users/create_user
 * @access Private (admin)
 *
 * @description
 * -> Validates input using Zod schema.
 * -> Persists new user in the database.
 * -> Returns the created UserDocument.
 */
export const createUser = async (
  request: FastifyRequest<{ Body: UserCreateInput }>,
  reply: FastifyReply
): Promise<void> => {
  sendSuccess(reply, await userService.createUser(userCreateSchema.parse(request.body)), 'User created');
};

/**
 * Deletes a user by ID.
 *
 * @route POST /api/users/delete_user
 * @access Private (admin)
 *
 * @description
 * -> Validates user ID using Zod schema.
 * -> Deletes user from the database.
 * -> Returns the deleted UserDocument.
 *
 * @fields
 * -> _id: ObjectId
 */
export const deleteUser = async (
  request: FastifyRequest<{ Body: UserDeletePayload }>,
  reply: FastifyReply
): Promise<void> => {
  const { _id }: UserDeletePayload = userDeleteSchema.parse(request.body);
  sendSuccess(reply, await userService.deleteUser(_id), 'User deleted');
};

/**
 * Updates a user.
 *
 * @route POST /api/users/edit_user
 * @access Private (admin)
 *
 * @description
 * -> Validates editable fields via Zod schema.
 * -> Updates user data in the database.
 * -> Returns the updated UserDocument.
 *
 * @fields
 * -> _id: ObjectId
 * -> name/email/phone/address (optional)
 */
export const editUser = async (
  request: FastifyRequest<{ Body: UserEditInput }>,
  reply: FastifyReply
): Promise<void> => {
  sendSuccess(reply, await userService.editUser(userEditSchema.parse(request.body)), 'User updated');
};
