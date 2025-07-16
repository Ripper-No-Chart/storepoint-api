import { Types } from 'mongoose';
import { UserRole } from '@/constants/user.constants';

/**
 * Payload encoded into JWT token.
 *
 * @description
 * -> Represents the data encoded into a JWT token.
 * -> Contains essential user information like user ID, email, and role.
 *
 * @property userId - MongoDB user _id as string
 * @property email - User email address
 * @property role - User role ("admin" | "cashier")
 * @property iat - Issued at timestamp
 * @property exp - Expiration timestamp
 */
export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

/**
 * Authenticated user object extracted from JWT.
 *
 * @description
 * -> Represents the user object after authentication, extracted from JWT.
 * -> Used to type `request.user` in Fastify.
 *
 * @property _id - MongoDB user ObjectId
 * @property email - User email address
 * @property role - User role
 */
export interface UserPayload {
  _id: Types.ObjectId;
  email: string;
  role: UserRole;
}
