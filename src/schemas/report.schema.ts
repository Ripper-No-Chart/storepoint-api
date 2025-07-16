import { PaymentType } from '@/constants/payment.constants';
import { z } from 'zod';

/**
 * Zod schema for generating sales report.
 *
 * @description
 * -> Validates ISO date strings for the reporting period.
 * -> Requires a valid groupBy unit: 'day', 'week', or 'month'.
 *
 * @fields
 * -> from: string (ISO 8601 date format)
 * -> to: string (ISO 8601 date format)
 * -> groupBy: 'day' | 'week' | 'month'
 */
export const reportSalesSchema = z.object({
  from: z.string().datetime({ message: 'Invalid from date' }),
  to: z.string().datetime({ message: 'Invalid to date' }),
  groupBy: z.enum(['day', 'week', 'month'], {
    required_error: 'groupBy is required'
  })
});

/**
 * Zod schema for generating low stock inventory report.
 *
 * @description
 * -> Requires a positive integer for stock threshold.
 * -> Used to fetch products with stock below or equal to this number.
 *
 * @fields
 * -> threshold: number > 0
 */
export const reportInventoryLowStockSchema = z.object({
  threshold: z.number().int().positive({ message: 'Threshold must be a positive integer' })
});

/**
 * Zod schema for generating payments report.
 *
 * @description
 * -> Requires a valid payment method from PaymentType enum.
 *
 * @fields
 * -> method: PaymentType
 */
export const reportPaymentsSchema = z.object({
  method: z.nativeEnum(PaymentType, {
    required_error: 'Payment method is required'
  })
});
