import { zObjectId } from '@/utils/zod.util';
import { z } from 'zod';

/**
 * Zod schema for creating a supplier.
 *
 * @description
 * -> Validates supplier name, email, phone, and address.
 *
 * @fields
 * -> name: string (required)
 * -> email: string (valid email, required)
 * -> phone: string (required)
 * -> address: string (required)
 */
export const supplierCreateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string()
});

/**
 * Zod schema for editing supplier details.
 *
 * @description
 * -> Validates supplier _id and optionally editable fields.
 *
 * @fields
 * -> _id: ObjectId (required)
 * -> name: string (optional)
 * -> email: string (valid email, optional)
 * -> phone: string (optional)
 * -> address: string (optional)
 */
export const supplierEditSchema = z.object({
  _id: zObjectId(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional()
});

/**
 * Zod schema for deleting a supplier by ID.
 *
 * @description
 * -> Validates the supplier _id for deletion.
 *
 * @fields
 * -> _id: ObjectId (required)
 */
export const supplierDeleteSchema = z.object({
  _id: zObjectId()
});
