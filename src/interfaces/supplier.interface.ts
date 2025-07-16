import { Document, Types } from 'mongoose';

/**
 * Base shape of a Supplier entity.
 *
 * @description
 * -> Represents the structure of a supplier entity.
 * -> Includes essential details such as name, contact email, phone number, and physical address.
 *
 * @property _id - MongoDB ObjectId
 * @property name - Supplier name (required)
 * @property email - Supplier contact email
 * @property phone - Supplier phone number
 * @property address - Supplier physical address
 * @property createdAt - Timestamp of creation (auto-managed)
 * @property updatedAt - Timestamp of last update (auto-managed)
 */
export interface Supplier {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose Supplier document interface.
 *
 * @description
 * -> Extends the base Supplier structure with Mongoose Document methods.
 * -> Represents a document in the MongoDB collection for suppliers.
 *
 * @property _id - MongoDB ObjectId (required)
 */
export interface SupplierDocument extends Omit<Supplier, '_id'>, Document {
  _id: Types.ObjectId;
}
