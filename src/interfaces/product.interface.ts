import { Document, Types } from 'mongoose';

/**
 * Base shape of a Product entity.
 *
 * @description
 * -> Represents the structure of a product entity.
 * -> Includes essential fields such as name, description, price, stock, and references to category and supplier.
 *
 * @property _id - MongoDB ObjectId
 * @property name - Product name (required)
 * @property description - Product description
 * @property price - Product price in decimal
 * @property stock - Inventory stock count
 * @property categoryId - Reference to associated category (_id)
 * @property supplierId - Reference to associated supplier (_id)
 * @property createdAt - Timestamp of creation (auto-managed)
 * @property updatedAt - Timestamp of last update (auto-managed)
 */
export interface Product {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: Types.ObjectId;
  supplierId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose Product document.
 *
 * @description
 * -> Extends the Product entity to include Mongoose Document methods.
 * -> Represents a document in the MongoDB collection for products.
 *
 * @property _id - MongoDB ObjectId (required)
 */
export interface ProductDocument extends Omit<Product, '_id'>, Document {
  _id: Types.ObjectId;
}
