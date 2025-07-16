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
  const exists: UserDocument | null = await UserModel.findOne({ email: data.email }).lean<UserDocument | null>();

  if (exists) throw createError(HTTP_STATUS.CONFLICT, 'Email already registered');

  const hashedPassword: string = await hashPassword(data.password);

  const user: UserDocument = new UserModel({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role
  });

  return assertExists(await user.save(), 'Failed to create user');
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
  const foundUser: UserDocument | null = await UserModel.findOne({ email: data.email }).lean<UserDocument | null>();
  const user: UserDocument = assertFound(foundUser, 'Invalid credentials');

  const validPassword: boolean = await comparePassword(data.password, user.password);
  if (!validPassword) throw createError(HTTP_STATUS.UNAUTHORIZED, 'Invalid credentials');

  const token: string = generateToken(user._id, user.role);
  return { token, user };
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
  const found: UserDocument | null = await UserModel.findById(userId).lean<UserDocument | null>();
  return assertFound(found, 'User not found');
};
