import { Schema, model } from 'mongoose';

import { USER_ROLES } from '@/constants/user.constants';
import { UserDocument } from '@/interfaces/user.interface';
import { hashPassword } from '@/utils/password.util';

/**
 * Mongoose schema for User.
 *
 * @description
 * -> Defines the structure of the User document in MongoDB.
 * -> Includes fields for name, email, password (hashed on save), and role.
 *
 * @fields
 * -> name: string
 * -> email: string (unique)
 * -> password: string (hashed on save)
 * -> role: 'admin' | 'cashier'
 */
const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: USER_ROLES, required: true }
  },
  { timestamps: true }
);

/**
 * Hash password before saving user.
 *
 * @description
 * -> Pre-save hook to hash the password before storing it in the database.
 */
userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const hashed: string = await hashPassword(this.password);
  this.password = hashed;
  next();
});

/**
 * Mongoose model for User.
 *
 * @description
 * -> Represents the MongoDB model for User.
 * -> Provides methods for interacting with User documents in the database.
 */
export const UserModel = model<UserDocument>('User', userSchema);
