import { Document, Types } from 'mongoose';
import { PaymentType } from '@/constants/payment.constants';

/**
 * Base shape of a Payment entity.
 *
 * @description
 * -> Represents the structure of a payment entity.
 * -> Includes fields for sale reference, method, amount, optional notes, and timestamps.
 *
 * @property sale     - Reference to associated sale (_id)
 * @property method   - Payment method (cash, credit, debit, mercadopago)
 * @property amount   - Amount paid (non-negative)
 * @property notes    - Optional notes about the payment
 * @property createdAt- Timestamp of creation (auto-managed)
 * @property updatedAt- Timestamp of last update (auto-managed)
 */
export interface IPayment {
  sale: Types.ObjectId;
  method: PaymentType;
  amount: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose Payment document interface.
 *
 * @description
 * -> Combines Payment fields with Mongoose Document methods.
 *
 * @property _id - MongoDB ObjectId (required)
 */
export interface PaymentDocument extends Omit<IPayment, '_id'>, Document {
  _id: Types.ObjectId;
}
