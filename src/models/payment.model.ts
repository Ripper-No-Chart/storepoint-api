import { model, Model, Schema } from 'mongoose';
import { PaymentType } from '@/constants/payment.constants';
import { PaymentDocument } from '@/interfaces/payment.interface';

/**
 * Mongoose schema for Payment.
 *
 * @description
 * -> Defines the structure of the Payment document in MongoDB.
 * -> Includes sale reference, payment method, amount, optional notes, and timestamps.
 *
 * @fields
 * -> sale: ObjectId (ref: Sale)
 * -> method: string (enum: PaymentType)
 * -> amount: number (non-negative)
 * -> notes: string (optional)
 */
const paymentSchema = new Schema<PaymentDocument>(
  {
    sale: { type: Schema.Types.ObjectId, ref: 'Sale', required: true },
    method: { type: String, enum: Object.values(PaymentType), required: true },
    amount: { type: Number, required: true, min: 0 },
    notes: { type: String }
  },
  { timestamps: true }
);

/**
 * Mongoose model for Payment.
 *
 * @description
 * -> Represents the MongoDB model for Payment.
 * -> Provides methods for interacting with Payment documents in the database.
 *
 * @property _id - MongoDB ObjectId (required)
 */
export const PaymentModel: Model<PaymentDocument> = model<PaymentDocument>('Payment', paymentSchema);
