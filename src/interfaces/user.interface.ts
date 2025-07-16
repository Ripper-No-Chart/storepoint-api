import { Document, Types } from 'mongoose';

import { UserRole } from '@/constants/user.constants';

/**
 * Base shape of a User entity (database model).
 *
 * @description
 * -> Represents the structure of a user entity in the database.
 * -> Includes essential fields like name, email, password (hashed), role, and timestamps for creation and updates.
 *
 * @property _id - MongoDB ObjectId
 * @property name - Full name of the user
 * @property email - Unique email address for login/identification
 * @property password - Hashed password string
 * @property role - User role ("admin" | "cashier")
 * @property createdAt - Timestamp of creation (auto-managed)
 * @property updatedAt - Timestamp of last update (auto-managed)
 */
export interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose User document interface.
 *
 * @description
 * -> Combines the base User structure with Mongoose Document methods.
 * -> Represents a document in the MongoDB collection for users.
 *
 * @property _id - MongoDB ObjectId (required)
 */
export interface UserDocument extends Omit<User, '_id'>, Document {
  _id: Types.ObjectId;
}
