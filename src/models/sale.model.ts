import { model, Model, Schema } from 'mongoose';
import { PaymentType } from '@/constants/payment.constants';
import { ISaleProduct, SaleDocument } from '@/interfaces/sale.interface';

/**
 * Sub‐schema for products within a Sale.
 *
 * @description
 * -> Defines each line item in the sale.
 *
 * @fields
 * -> product: ObjectId (ref: Product)
 * -> quantity: number
 * -> price: number
 */
const saleProductSchema = new Schema<ISaleProduct>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { _id: false }
);

/**
 * Mongoose schema for Sale.
 *
 * @description
 * -> Persists a sale, including cashier ref, sold items, totals and payment info.
 *
 * @fields
 * -> cashier: ObjectId (ref: User)
 * -> products: [saleProductSchema]
 * -> total: number
 * -> paymentType: enum PaymentType
 * -> isPaid: boolean (default: false)
 */
const saleSchema = new Schema<SaleDocument>(
  {
    cashier: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: { type: [saleProductSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    paymentType: { type: String, enum: Object.values(PaymentType), required: true },
    isPaid: { type: Boolean, default: false }
  },
  { timestamps: true }
);

/**
 * Mongoose model for Sale.
 *
 * @description
 * -> Represents the MongoDB model for Sale.
 * -> Provides methods for interacting with Sale documents.
 *
 * @property _id - MongoDB ObjectId
 */
export const SaleModel: Model<SaleDocument> = model<SaleDocument>('Sale', saleSchema);
