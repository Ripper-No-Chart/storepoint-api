import { z } from 'zod';
import { saleCreateSchema, saleGetByIdSchema, saleLeanSchema } from '@/schemas/sale.schema';

/**
 * Payload for creating a sale.
 *
 * @description
 * -> Uses Zod schema to infer the input structure for creating a sale.
 * -> Validates list of products (productId, quantity, price) and payment method.
 */
export type CreateSaleBody = z.infer<typeof saleCreateSchema>;

/**
 * Payload for retrieving a sale by ID.
 *
 * @description
 * -> Uses Zod schema to infer the input structure for fetching a sale by ID.
 */
export type GetSaleByIdBody = z.infer<typeof saleGetByIdSchema>;

/**
 * Minimal Sale structure for internal queries (RMA).
 *
 * @description
 * -> Uses Zod schema to infer the structure of a lean sale document.
 * -> Contains only the array of sold products (product and quantity).
 *
 * @fields
 * -> products: Array<{ product: ObjectId, quantity: number }>
 */
export type SaleLean = z.infer<typeof saleLeanSchema>;

/**
 * Minimal Sale structure for internal queries (RMA).
 *
 * @description
 * -> Uses Zod schema to infer the structure of a lean sale document.
 * -> Contains only the array of sold products (product and quantity).
 *
 * @fields
 * -> products: Array<{ product: ObjectId, quantity: number }>
 */
export type SaleProductInput = CreateSaleBody['products'][number];
