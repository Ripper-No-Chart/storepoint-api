import { model, Model, Schema } from 'mongoose';
import { IRMAItem, RMADocument } from '@/interfaces/rma.interface';

/**
 * Mongoose schema for RMA items.
 *
 * @description
 * -> Defines the structure of each returned item in an RMA.
 * -> Includes product reference, quantity and optional reason.
 *
 * @fields
 * -> product: ObjectId (ref: Product)
 * -> quantity: number
 * -> reason: string (optional)
 */
const rmaItemSchema = new Schema<IRMAItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    reason: { type: String }
  },
  { _id: false }
);

/**
 * Mongoose schema for RMA.
 *
 * @description
 * -> Defines the structure of an RMA document.
 * -> References sale, array of returned items, processing user and date.
 *
 * @fields
 * -> sale: ObjectId (ref: Sale, required)
 * -> items: [rmaItemSchema] (required)
 * -> processedBy: ObjectId (ref: User, required)
 * -> date: Date (defaults to now)
 */
const rmaSchema = new Schema<RMADocument>(
  {
    sale: { type: Schema.Types.ObjectId, ref: 'Sale', required: true },
    items: { type: [rmaItemSchema], required: true },
    processedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

/**
 * Mongoose model for RMA.
 *
 * @description
 * -> Represents the MongoDB model for RMA.
 * -> Provides methods for interacting with RMA documents in the database.
 *
 * @fields
 * -> _id: ObjectId (required)
 */
export const RMAModel: Model<RMADocument> = model<RMADocument>('RMA', rmaSchema);
