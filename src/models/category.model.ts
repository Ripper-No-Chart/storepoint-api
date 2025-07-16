import mongoose, { Model, Schema } from 'mongoose';

import { CategoryDocument } from '@/interfaces/category.interface';

/**
 * Mongoose schema for Category.
 *
 * @description
 * -> Defines the structure of the Category document in MongoDB.
 * -> Includes the fields `name` (required) and `description` (optional).
 *
 * @fields
 * -> name: string
 * -> description: string
 */
const CategorySchema: Schema<CategoryDocument> = new Schema(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true }
  },
  { timestamps: true }
);

/**
 * Mongoose model for Category.
 *
 * @description
 * -> Represents the MongoDB model for Category.
 * -> Provides methods for interacting with Category documents in the database.
 */
export const CategoryModel: Model<CategoryDocument> = mongoose.model<CategoryDocument>('Category', CategorySchema);
