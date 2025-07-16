import { Document, Types } from 'mongoose';

/**
 * Base shape of a Category entity.
 *
 * @description
 * -> Represents the structure of a category entity.
 * -> Includes the name, description, and timestamps for creation and updates.
 *
 * @property _id - MongoDB ObjectId
 * @property name - Display name of the category (required)
 * @property description - Optional description text
 * @property createdAt - Timestamp of creation (auto-managed)
 * @property updatedAt - Timestamp of last update (auto-managed)
 */
export interface Category {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose Category document interface.
 *
 * @description
 * -> Extends the Mongoose Document with the fields from the Category interface.
 * -> Represents a document in MongoDB for the Category collection.
 *
 * @property _id - MongoDB ObjectId (required)
 */
export interface CategoryDocument extends Omit<Category, '_id'>, Document {
  _id: Types.ObjectId;
}
