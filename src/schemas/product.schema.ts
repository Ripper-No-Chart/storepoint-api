import { zObjectId } from '@/utils/zod.util';
import { z } from 'zod';

/**
 * Zod schema for creating a product.
 *
 * @description
 * -> Validates all required fields for a new product.
 * -> Ensures the product has valid name, description, price, stock, categoryId, and supplierId.
 *
 * @fields
 * -> name: string (required)
 * -> description: string (required)
 * -> price: number (required)
 * -> stock: number (required)
 * -> categoryId: ObjectId (required)
 * -> supplierId: ObjectId (required)
 */
export const productCreateSchema = z.object({
  name: z.string({ required_error: 'Product name is required' }),
  description: z.string({ required_error: 'Product description is required' }),
  price: z.number({ required_error: 'Price is required' }),
  stock: z.number({ required_error: 'Stock is required' }),
  categoryId: zObjectId(),
  supplierId: zObjectId()
});

/**
 * Zod schema for deleting a product by ID.
 *
 * @description
 * -> Validates the product ID before deletion.
 * -> Ensures the provided _id is a valid ObjectId.
 *
 * @fields
 * -> _id: ObjectId (required)
 */
export const productDeleteSchema = z.object({
  _id: zObjectId()
});

/**
 * Zod schema for editing a product.
 *
 * @description
 * -> Validates all editable fields of a product.
 * -> Requires _id, other fields are optional and validated.
 *
 * @fields
 * -> _id: ObjectId (required)
 * -> name: string (optional)
 * -> description: string (optional)
 * -> price: number (optional)
 * -> stock: number (optional)
 * -> categoryId: ObjectId (optional)
 * -> supplierId: ObjectId (optional)
 */
export const productEditSchema = z.object({
  _id: zObjectId(),
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  stock: z.number().optional(),
  categoryId: zObjectId().optional(),
  supplierId: zObjectId().optional()
});
