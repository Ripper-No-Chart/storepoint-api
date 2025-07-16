import mongoose, { Model, Schema } from 'mongoose';

import { ProductDocument } from '@/interfaces/product.interface';

/**
 * Mongoose schema for Product.
 *
 * @description
 * -> Defines the structure of the Product document in MongoDB.
 * -> Includes fields for product name, description, price, stock, and references to category and supplier.
 *
 * @fields
 * -> name: string
 * -> description: string
 * -> price: number
 * -> stock: number
 * -> categoryId: ObjectId (ref: Category)
 * -> supplierId: ObjectId (ref: Supplier)
 */
const ProductSchema: Schema<ProductDocument> = new Schema(
  {
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true }
  },
  { timestamps: true }
);

/**
 * Mongoose model for Product.
 *
 * @description
 * -> Represents the MongoDB model for Product.
 * -> Provides methods for interacting with Product documents in the database.
 */
export const ProductModel: Model<ProductDocument> = mongoose.model<ProductDocument>('Product', ProductSchema);
