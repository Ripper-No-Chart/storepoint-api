import { Types } from 'mongoose';
import { z } from 'zod';

import { productCreateSchema, productDeleteSchema, productEditSchema } from '@/schemas/product.schema';

/**
 * Payload for creating a product.
 *
 * @description
 * -> Describes the structure of the input data required to create a product.
 * -> Includes the product's name, description, price, stock, and associated category and supplier IDs.
 */
export type ProductCreateInput = z.infer<typeof productCreateSchema>;

/**
 * Payload for deleting a product by ID.
 *
 * @description
 * -> Represents the payload to delete a product by its unique ObjectId.
 * -> Only requires the product's _id to perform the deletion.
 */
export type ProductDeletePayload = z.infer<typeof productDeleteSchema>;

/**
 * Payload for editing product details.
 *
 * @description
 * -> Defines the structure for editing an existing product's details.
 * -> Allows for optional fields to update, including name, description, price, stock, and references to category and supplier.
 */
export type ProductEditInput = z.infer<typeof productEditSchema>;

/**
 * Lean projection of a product document.
 *
 * @description
 * -> Used for read-only operations where only basic product fields are needed.
 * -> Optimized for report queries or performance-critical aggregations.
 * -> Matches projection: { _id, name, stock }
 */
export type ProductLean = {
  _id: Types.ObjectId;
  name: string;
  stock: number;
};
