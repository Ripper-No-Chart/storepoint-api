import { reportInventoryLowStockSchema, reportPaymentsSchema, reportSalesSchema } from '@/schemas/report.schema';
import { z } from 'zod';

/**
 * Type for the input of sales report.
 *
 * @description
 * -> Extracts flat input from reportSalesSchema.
 * -> Includes: from, to, groupBy ('day' | 'week' | 'month')
 */
export type ReportSalesInput = z.infer<typeof reportSalesSchema>;

/**
 * Type for the input of low stock inventory report.
 *
 * @description
 * -> Extracts flat input from reportInventoryLowStockSchema.
 * -> Includes: threshold number
 */
export type ReportInventoryLowStockInput = z.infer<typeof reportInventoryLowStockSchema>;

/**
 * Type for the input of payment report.
 *
 * @description
 * -> Extracts flat input from reportPaymentsSchema.
 * -> Includes: method (from PaymentType enum)
 */
export type ReportPaymentsInput = z.infer<typeof reportPaymentsSchema>;
