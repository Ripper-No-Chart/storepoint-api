import { Types } from 'mongoose';
import { HTTP_STATUS } from '@/constants/http.constants';
import { UserDocument } from '@/interfaces/user.interface';
import { UserModel } from '@/models/user.model';
import { LoginInput, RegisterInput } from '@/types/auth.types';
import { assertExists, assertFound } from '@/utils/assert.util';
import { createError } from '@/utils/error.util';
import { comparePassword, hashPassword } from '@/utils/password.util';
import { generateToken } from '@/utils/token.util';

/**
 * Registers a new user in the system.
 *
 * @description
 * -> Creates a new user by hashing the password and saving user details to the database.
 * -> Throws a conflict error if the email is already registered.
 *
 * @param data - User registration payload
 * @returns The created UserDocument
 * @throws
 * -> Conflict error if email already exists
 */
export const register = async (data: RegisterInput): Promise<UserDocument> => {
  if (await UserModel.findOne({ email: data.email }).lean<UserDocument | null>())
    throw createError(HTTP_STATUS.CONFLICT, 'Email already registered');

  return assertExists(
    await new UserModel({
      name: data.name,
      email: data.email,
      password: await hashPassword(data.password),
      role: data.role
    }).save(),
    'Failed to create user'
  );
};

/**
 * Logs in a user and returns an access token.
 *
 * @description
 * -> Validates the user credentials (email and password).
 * -> If valid, generates and returns a JWT token and the authenticated user.
 * -> Throws an unauthorized error if the credentials are invalid.
 *
 * @param data - Login credentials
 * @returns Object with JWT token and authenticated user
 * @throws
 * -> Unauthorized error if credentials are invalid
 */
export const login = async (data: LoginInput): Promise<{ token: string; user: UserDocument }> => {
  if (
    !(await comparePassword(
      data.password,
      assertFound(await UserModel.findOne({ email: data.email }).lean<UserDocument | null>(), 'Invalid credentials')
        .password
    ))
  )
    throw createError(HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials');

  return {
    token: generateToken(
      assertFound(await UserModel.findOne({ email: data.email }).lean<UserDocument | null>(), 'Invalid credentials')
        ._id,
      assertFound(await UserModel.findOne({ email: data.email }).lean<UserDocument | null>(), 'Invalid credentials')
        .role
    ),
    user: assertFound(await UserModel.findOne({ email: data.email }).lean<UserDocument | null>(), 'Invalid credentials')
  };
};

/**
 * Retrieves a user by their ObjectId, or throws if not found.
 *
 * @description
 * -> Looks up a user by MongoDB ObjectId.
 * -> Throws 404 if no user is found.
 *
 * @param userId - MongoDB ObjectId of the user
 * @returns The found user document
 * @throws
 * -> 404 Not Found if user is not in database
 */
export const getUserByIdOrFail = async (userId: Types.ObjectId): Promise<UserDocument> => {
  return assertFound(await UserModel.findById(userId).lean<UserDocument | null>(), 'User not found');
};
