import { zObjectId } from '@/utils/zod.util';
import { z } from 'zod';

/**
 * Zod schema for creating an RMA (Return Merchandise Authorization).
 *
 * @description
 * -> Validates sale ID and array of returned items.
 * -> Each item must have valid productId, quantity ≥ 1, and optional reason.
 * -> Accepts optional date (ISO string).
 *
 * @fields
 * -> saleId: ObjectId (required)
 * -> items: Array<{ productId: ObjectId, quantity: number, reason?: string }>
 * -> date?: ISO string
 */
export const rmaCreateSchema = z.object({
  saleId: zObjectId(),
  items: z
    .array(
      z.object({
        productId: zObjectId(),
        quantity: z.number().int().positive({ message: 'Quantity must be at least 1' }),
        reason: z.string().optional()
      })
    )
    .nonempty({ message: 'At least one item is required' }),
  date: z.string().optional()
});

/**
 * Zod schema for listing RMAs by sale.
 *
 * @description
 * -> Validates that saleId is a valid MongoDB ObjectId.
 *
 * @fields
 * -> saleId: ObjectId (required)
 */
export const rmaListSchema = z.object({
  saleId: zObjectId()
});
