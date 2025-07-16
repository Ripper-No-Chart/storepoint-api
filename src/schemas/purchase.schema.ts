import { zObjectId } from '@/utils/zod.util';
import { z } from 'zod';

/**
 * Zod schema for creating a purchase.
 *
 * @description
 * -> Validates the required fields for creating a purchase.
 * -> Ensures the product ID is valid and quantity is at least 1.
 *
 * @fields
 * -> productId: ObjectId (required)
 * -> quantity: number (min 1, required)
 */
export const purchaseCreateSchema = z.object({
  productId: zObjectId(),
  quantity: z.number({ required_error: 'Quantity is required' }).min(1, { message: 'Quantity must be at least 1' })
});

/**
 * Zod schema for deleting a purchase by ID.
 *
 * @description
 * -> Validates the required field to delete a purchase by its ID.
 * -> Ensures the provided ID is a valid ObjectId.
 *
 * @fields
 * -> _id: ObjectId (required)
 */
export const purchaseDeleteSchema = z.object({
  _id: zObjectId()
});

/**
 * Zod schema for editing purchase details.
 *
 * @description
 * -> Validates the required fields to edit a purchase.
 * -> The purchase ID is required and validated.
 * -> Product ID and quantity are optional and can be updated.
 *
 * @fields
 * -> _id: ObjectId (required)
 * -> productId: ObjectId (optional)
 * -> quantity: number (min 1, optional)
 */
export const purchaseEditSchema = z.object({
  _id: zObjectId(),
  productId: zObjectId().optional(),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }).optional()
});
