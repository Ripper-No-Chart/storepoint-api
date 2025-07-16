import { zObjectId } from '@/utils/zod.util';
import { z } from 'zod';

/**
 * Zod schema for creating a category.
 *
 * @description
 * -> Validates the required fields to create a category.
 * -> Ensures the category has a non-empty name.
 *
 * @fields
 * -> name: string (required, non-empty)
 */
export const categoryCreateSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name cannot be empty')
});

/**
 * Zod schema for editing category details.
 *
 * @description
 * -> Validates the required fields to edit a category.
 * -> _id must be a valid ObjectId.
 * -> name is optional but must be a non-empty string if provided.
 *
 * @fields
 * -> _id: ObjectId (required)
 * -> name: string (optional)
 */
export const categoryEditSchema = z.object({
  _id: zObjectId(),
  name: z.string().min(1, 'Name cannot be empty').optional()
});

/**
 * Zod schema for deleting a category by ID.
 *
 * @description
 * -> Validates the required field to delete a category.
 * -> Ensures the provided ID is a valid ObjectId.
 *
 * @fields
 * -> _id: ObjectId (required)
 */
export const categoryDeleteSchema = z.object({
  _id: zObjectId()
});
