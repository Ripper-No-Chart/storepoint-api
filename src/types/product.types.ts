import { Types } from 'mongoose';
import { z } from 'zod';

import {
  CriticalProductQuerySchema,
  productCreateSchema,
  productDeleteSchema,
  productEditSchema,
  productQuerySchema
} from '@/schemas/product.schema';

/**
 * Payload for creating a product.
 *
 * @description
 * -> Describes the structure of the input data required to create a product.
 * -> Includes the product's name, description, price, stock, critical stock and associated category and supplier IDs.
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
 * -> Allows for optional fields to update, including name, description, price, stock,critical stock and references to category and supplier.
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

/**
 * Product query DTO.
 *
 * @description
 * -> Represents validated product query parameters from client.
 * -> Used to filter and paginate product list.
 *
 * @fields
 * -> search: string (optional)
 * -> criticalOnly: boolean (optional)
 * -> page: number (default 1)
 * -> limit: number (default 10)
 */
export type ProductQueryDto = z.infer<typeof productQuerySchema>;

/**
 * Critical product query DTO.
 *
 * @description
 * -> Represents validated pagination parameters for critical product listing.
 * -> Used exclusively by the /products/critical endpoint.
 *
 * @fields
 * -> page: number (default 1)
 * -> limit: number (default 10)
 */
export type CriticalProductQueryDto = z.infer<typeof CriticalProductQuerySchema>;
