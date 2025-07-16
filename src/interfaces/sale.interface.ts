import { Document, Types } from 'mongoose';
import { PaymentType } from '@/constants/payment.constants';

/**
 * Base shape of a SaleProduct entity.
 *
 * @description
 * -> Represents one line item in a sale.
 *
 * @property product  - Reference to the product sold (_id)
 * @property quantity - Number of units sold
 * @property price    - Price per unit at time of sale
 */
export interface ISaleProduct {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

/**
 * Base shape of a Sale entity.
 *
 * @description
 * -> Represents a completed sale transaction.
 *
 * @property cashier     - Reference to the user (cashier) who made the sale (_id)
 * @property products    - Array of sold items
 * @property total       - Calculated total value of the sale
 * @property paymentType - Payment method used
 * @property isPaid      - Indicates if the sale is fully paid
 * @property createdAt   - Timestamp of creation
 * @property updatedAt   - Timestamp of last update
 */
export interface ISale {
  cashier: Types.ObjectId;
  products: ISaleProduct[];
  total: number;
  paymentType: PaymentType;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose Sale document interface.
 *
 * @description
 * -> Combines ISale fields with Mongoose Document methods.
 *
 * @property _id - MongoDB ObjectId
 */
export interface SaleDocument extends Omit<ISale, '_id'>, Document {
  _id: Types.ObjectId;
}
