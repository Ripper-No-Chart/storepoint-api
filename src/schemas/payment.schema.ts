import { PaymentType } from '@/constants/payment.constants';
import { zObjectId } from '@/utils/zod.util';
import { z } from 'zod';

/**
 * Zod schema for creating a payment.
 *
 * @description
 * -> Validates input data for registering a payment linked to a sale.
 * -> Ensures saleId is a valid ObjectId, method is a valid enum, and amount is a non-negative number.
 * -> Notes are optional but limited to 150 characters.
 *
 * @fields
 * -> saleId: ObjectId (required)
 * -> method: PaymentType (required)
 * -> amount: number (non-negative, required)
 * -> notes: string (optional, max 150 chars)
 */
export const paymentCreateSchema = z.object({
  saleId: zObjectId(),
  method: z.nativeEnum(PaymentType, {
    required_error: 'Payment method is required'
  }),
  amount: z.number({ required_error: 'Amount is required' }).nonnegative({
    message: 'Amount must be 0 or more'
  }),
  notes: z.string().max(150, 'Notes must be 150 characters or fewer').optional()
});

/**
 * Zod schema for listing payments linked to a specific sale.
 *
 * @description
 * -> Validates saleId for querying payments.
 *
 * @fields
 * -> saleId: ObjectId (required)
 */
export const paymentListSchema = z.object({
  saleId: zObjectId()
});
