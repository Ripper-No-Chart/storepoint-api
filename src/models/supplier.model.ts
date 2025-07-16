import mongoose, { Model, Schema } from 'mongoose';

import { SupplierDocument } from '@/interfaces/supplier.interface';

/**
 * Mongoose schema for Supplier.
 *
 * @description
 * -> Defines the structure of the Supplier document in MongoDB.
 * -> Includes fields for name, email, phone, and address, all of which are required and trimmed.
 *
 * @fields
 * -> name: string
 * -> email: string
 * -> phone: string
 * -> address: string
 */
const SupplierSchema = new Schema<SupplierDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

/**
 * Mongoose model for Supplier.
 *
 * @description
 * -> Represents the MongoDB model for Supplier.
 * -> Provides methods for interacting with Supplier documents in the database.
 */
export const SupplierModel: Model<SupplierDocument> = mongoose.model<SupplierDocument>('Supplier', SupplierSchema);
