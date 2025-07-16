import { Document, Types } from 'mongoose';

/**
 * Returned item in an RMA.
 *
 * @description
 * -> Represents a returned product in an RMA operation.
 * -> Includes the product reference, quantity and optional reason.
 *
 * @fields
 * -> product: ObjectId (required)
 * -> quantity: number (required)
 * -> reason: string (optional)
 */
export interface IRMAItem {
  product: Types.ObjectId;
  quantity: number;
  reason?: string;
}

/**
 * Base shape of an RMA entity.
 *
 * @description
 * -> Represents a return (RMA) operation for a sale.
 * -> Includes sale ref, returned items, user who processed it, and date.
 *
 * @fields
 * -> sale: ObjectId (required)
 * -> items: IRMAItem[] (required)
 * -> processedBy: ObjectId (required)
 * -> date: Date (required)
 * -> createdAt: Date (auto)
 * -> updatedAt: Date (auto)
 */
export interface IRMA {
  sale: Types.ObjectId;
  items: IRMAItem[];
  processedBy: Types.ObjectId;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose RMA document interface.
 *
 * @description
 * -> Combines IRMA fields with Mongoose Document methods.
 *
 * @fields
 * -> _id: ObjectId (required)
 */
export interface RMADocument extends Omit<IRMA, '_id'>, Document {
  _id: Types.ObjectId;
}
