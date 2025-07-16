import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { UserRole } from '@/constants/user.constants';

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
  const secret: string = process.env.JWT_SECRET || 'default_secret';
  const expiresIn: SignOptions['expiresIn'] = (process.env.JWT_EXPIRES_IN || '1d') as SignOptions['expiresIn'];

  const payload: JwtPayload = { userId, role };
  return jwt.sign(payload, secret, { expiresIn });
};
