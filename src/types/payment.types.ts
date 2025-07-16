import { paymentCreateSchema, paymentListSchema } from '@/schemas/payment.schema';
import { z } from 'zod';

/**
 * Payload for creating a payment.
 *
 * @description
 * -> Uses Zod schema to infer the payment creation input structure.
 */
export type CreatePaymentBody = z.infer<typeof paymentCreateSchema>;

/**
 * Payload for listing payments by sale.
 *
 * @description
 * -> Uses Zod schema to infer the structure for fetching payments of a sale.
 */
export type ListPaymentsBySaleBody = z.infer<typeof paymentListSchema>;

/**
 * Result structure from payment aggregation query.
 *
 * @description
 * -> Represents the structure of the aggregation result when grouping payments by sale.
 * -> Includes the total amount paid toward a specific sale.
 *
 * @fields
 * -> totalPaid: number (sum of all payment amounts)
 */
export type PaymentAggregationResult = {
  totalPaid: number;
};
