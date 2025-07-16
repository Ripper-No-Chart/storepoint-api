import { z } from 'zod';

import { categoryCreateSchema, categoryDeleteSchema, categoryEditSchema } from '@/schemas/category.schema';

/**
 * Payload for creating a category.
 *
 * @description
 * -> Uses Zod schema to infer the category creation input structure.
 * -> Ensures valid data format for creating a category (name).
 */
export type CategoryCreateInput = z.infer<typeof categoryCreateSchema>;

/**
 * Payload for editing category details.
 *
 * @description
 * -> Uses Zod schema to infer the category edit input structure.
 * -> Ensures valid data format for editing a category (id and optional name).
 */
export type CategoryEditInput = z.infer<typeof categoryEditSchema>;

/**
 * Payload for deleting a category by ID.
 *
 * @description
 * -> Uses Zod schema to infer the category deletion input structure.
 * -> Ensures valid data format for deleting a category (id).
 */
export type CategoryDeletePayload = z.infer<typeof categoryDeleteSchema>;
