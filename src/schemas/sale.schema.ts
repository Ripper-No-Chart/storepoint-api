import { PaymentType } from '@/constants/payment.constants';
import { zObjectId } from '@/utils/zod.util';
import { z } from 'zod';

/**
 * Zod schema for creating a new sale.
 *
 * @description
 * -> Validates an array of products with productId, quantity, and price.
 * -> Ensures paymentType is a valid enum.
 *
 * @fields
 * -> products: Array<{ productId: ObjectId, quantity: number, price: number }>
 * -> paymentType: enum(PaymentType)
 */
export const saleCreateSchema = z.object({
  products: z
    .array(
      z.object({
        productId: zObjectId(),
        quantity: z.number().int().positive(),
        price: z.number().nonnegative()
      })
    )
    .nonempty({ message: 'At least one product is required' }),
  paymentType: z.nativeEnum(PaymentType)
});

/**
 * Zod schema for querying sales with filters and pagination.
 *
 * @description
 * -> Validates optional filters for search and date range.
 * -> Validates pagination inputs with defaults.
 *
 * @fields
 * -> search: string (optional)
 * -> from: string (ISO date, optional)
 * -> to: string (ISO date, optional)
 * -> page: number (default 1)
 * -> limit: number (default 10)
 */
export const SaleQuerySchema = z.object({
  search: z.string().trim().min(1).optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10)
});

/**
 * Zod schema for fetching a sale by ID.
 *
 * @description
 * -> Validates MongoDB ObjectId for sale lookup.
 *
 * @fields
 * -> saleId: ObjectId (required)
 */
export const saleGetByIdSchema = z.object({
  saleId: zObjectId()
});

/**
 * Zod schema for validating minimal sale product info for RMA.
 *
 * @description
 * -> Validates shape of product and quantity returned from lean sale doc.
 *
 * @fields
 * -> products: Array<{ product: ObjectId, quantity: number }>
 */
export const saleLeanSchema = z.object({
  products: z.array(
    z.object({
      product: zObjectId(),
      quantity: z.number().int().nonnegative()
    })
  )
});
