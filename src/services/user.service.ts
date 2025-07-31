import { HTTP_STATUS } from '@/constants/http.constants';
import { UserDocument } from '@/interfaces/user.interface';
import { UserModel } from '@/models/user.model';
import { UserCreateInput, UserDeletePayload, UserEditInput } from '@/types/user.types';
import { assertExists, assertFound } from '@/utils/assert.util';
import { createError } from '@/utils/error.util';
import { hashPassword } from '@/utils/password.util';

/**
 * Creates a new user.
 *
 * @description
 * -> Checks if email already exists.
 * -> Hashes password before saving.
 *
 * @param data - User creation input
 * @returns The created user document
 * @throws
 * -> 409 if email already exists
 */
export const createUser = async (data: UserCreateInput): Promise<UserDocument> => {
  if (await UserModel.findOne({ email: data.email }).lean<UserDocument | null>()) {
    throw createError(HTTP_STATUS.CONFLICT, 'Email already exists');
  }

  return assertExists(
    await new UserModel({ ...data, password: await hashPassword(data.password) }).save(),
    'Failed to create user'
  );
};

/**
 * Retrieves all users from the database.
 *
 * @description
 * -> Returns an array of user documents.
 *
 * @returns Array of user documents
 */
export const listUsers = async (): Promise<UserDocument[]> => {
  return UserModel.find().lean<UserDocument[]>();
};

/**
 * Deletes a user by ID.
 *
 * @description
 * -> Deletes a user record from the database.
 *
 * @param _id - The ObjectId of the user to delete
 * @returns The deleted user document
 */
export const deleteUser = async (_id: UserDeletePayload['_id']): Promise<UserDocument> => {
  return assertFound(await UserModel.findByIdAndDelete(_id).lean<UserDocument | null>(), 'User not found');
};

/**
 * Updates a user by ID.
 *
 * @description
 * -> Partial update (PATCH).
 * -> Updates user details with the provided fields.
 *
 * @param data - Update payload including _id and fields to update
 * @returns The updated user document
 */
export const editUser = async (data: UserEditInput): Promise<UserDocument> => {
  const { _id, ...update } = data;

  return assertFound(
    await UserModel.findByIdAndUpdate(_id, update, {
      new: true
    }).lean<UserDocument | null>(),
    'User not found'
  );
};
