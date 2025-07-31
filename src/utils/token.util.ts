import { UserRole } from '@/constants/user.constants';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';

/**
 * Generates a JWT token.
 *
 * @description
 * -> Creates a JWT token for the user with their ID and role.
 * -> The token is signed using a secret and includes an expiration time.
 *
 * @param userId - MongoDB user ID
 * @param role - User role
 * @returns Signed JWT token
 */
export const generateToken = (userId: Types.ObjectId, role: UserRole): string => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET ?? 'default_secret', {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? '1d') as SignOptions['expiresIn']
  });
};
