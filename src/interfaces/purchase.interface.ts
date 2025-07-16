import { Document, Types } from 'mongoose';

/**
 * Base shape of a Purchase entity.
 *
 * @description
 * -> Represents the structure of a purchase entity.
 * -> Includes essential fields like product, quantity, purchase date, and references to supplier.
 *
 * @property _id - MongoDB ObjectId
 * @property productId - Reference to purchased product (_id)
 * @property quantity - Amount of items purchased
 * @property purchaseDate - Optional date of the purchase
 * @property supplierId - Reference to supplier (_id)
 * @property createdAt - Timestamp of creation (auto-managed)
 * @property updatedAt - Timestamp of last update (auto-managed)
 */
export interface Purchase {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  purchaseDate?: Date;
  supplierId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose Purchase document interface.
 *
 * @description
 * -> Combines Purchase fields with Mongoose Document methods.
 * -> Represents a document in the MongoDB collection for purchases.
 *
 * @property _id - MongoDB ObjectId (required)
 */
export interface PurchaseDocument extends Omit<Purchase, '_id'>, Document {
  _id: Types.ObjectId;
}
