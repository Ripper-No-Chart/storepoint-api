import {
  CriticalProductQuerySchema,
  productCreateSchema,
  productDeleteSchema,
  productEditSchema,
  productQuerySchema
} from '@/schemas/product.schema';
import * as productService from '@/services/product.service';
import {
  CriticalProductQueryDto,
  ProductCreateInput,
  ProductDeletePayload,
  ProductEditInput,
  ProductQueryDto
} from '@/types/product.types';
import { sendSuccess } from '@/utils/response.util';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * List products with filters and pagination.
 *
 * @description
 * -> Accepts search, criticalOnly, page, and limit via POST body.
 * -> Validates input with ProductQuerySchema and returns a paginated list.
 *
 * @body
 * -> search: string (optional)
 * -> criticalOnly: boolean (optional)
 * -> page: number (default 1)
 * -> limit: number (default 10)
 *
 * @returns
 * -> data: Product[]
 * -> total: number
 * -> page: number
 * -> limit: number
 */
export const listProducts = async (
  request: FastifyRequest<{ Body: ProductQueryDto }>,
  reply: FastifyReply
): Promise<void> => {
  sendSuccess(
    reply,
    await productService.listProductsWithFilters(productQuerySchema.parse(request.body)),
    'Products fetched'
  );
};

/**
 * Creates a new product.
 *
 * @route POST /api/products/create_product
 * @access manager, admin
 *
 * @description
 * -> Requires name, price, and stock.
 *
 * @fields
 * -> name – Product name
 * -> price – Unit price
 * -> stock – Initial quantity
 */
export const createProduct = async (
  request: FastifyRequest<{ Body: ProductCreateInput }>,
  reply: FastifyReply
): Promise<void> => {
  sendSuccess(reply, await productService.createProduct(productCreateSchema.parse(request.body)), 'Product created');
};

/**
 * Deletes a product by ID.
 *
 * @route POST /api/products/delete_product
 * @access manager, admin
 *
 * @description
 * -> Used when discontinuing items.
 *
 * @fields
 * -> id – Product ID
 */

export const deleteProduct = async (
  request: FastifyRequest<{ Body: ProductDeletePayload }>,
  reply: FastifyReply
): Promise<void> => {
  const { _id } = productDeleteSchema.parse(request.body);
  sendSuccess(reply, await productService.deleteProduct(_id), 'Product deleted');
};

/**
 * Edits an existing product.
 *
 * @route POST /api/products/edit_product
 * @access manager, admin
 *
 * @description
 * -> Can update name, price, stock.
 *
 * @fields
 * -> id – Product ID
 * -> name – New name
 * -> price – New price
 * -> stock – New quantity
 */

export const editProduct = async (
  request: FastifyRequest<{ Body: ProductEditInput }>,
  reply: FastifyReply
): Promise<void> => {
  sendSuccess(reply, await productService.editProduct(productEditSchema.parse(request.body)), 'Product updated');
};

/**
 * List products in critical stock condition.
 *
 * @description
 * -> Returns products where stock <= criticalQuantity with pagination.
 *
 * @route POST /products/critical
 * @body
 * -> page: number (default 1)
 * -> limit: number (default 10)
 */
export const listCriticalProducts = async (
  request: FastifyRequest<{ Body: CriticalProductQueryDto }>,
  reply: FastifyReply
): Promise<void> => {
  sendSuccess(
    reply,
    await productService.listProductsWithFilters({
      ...CriticalProductQuerySchema.parse(request.body),
      criticalOnly: true
    }),
    'Critical products fetched'
  );
};
