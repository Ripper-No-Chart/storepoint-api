import mongoose, { Model, Schema } from 'mongoose';

import { PurchaseDocument } from '@/interfaces/purchase.interface';

/**
 * Mongoose schema for Purchase.
 *
 * @description
 * -> Defines the structure of the Purchase document in MongoDB.
 * -> Includes fields for product reference, quantity, purchase date, and supplier reference.
 *
 * @fields
 * -> productId: ObjectId (ref: Product)
 * -> quantity: number
 * -> purchaseDate: Date
 * -> supplierId: ObjectId (ref: Supplier)
 */
const PurchaseSchema: Schema<PurchaseDocument> = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    purchaseDate: { type: Date, required: true },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true }
  },
  { timestamps: true }
);

/**
 * Mongoose model for Purchase.
 *
 * @description
 * -> Represents the MongoDB model for Purchase.
 * -> Provides methods for interacting with Purchase documents in the database.
 */
export const PurchaseModel: Model<PurchaseDocument> = mongoose.model<PurchaseDocument>('Purchase', PurchaseSchema);
