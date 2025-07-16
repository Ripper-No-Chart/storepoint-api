import { ProductDocument } from '@/interfaces/product.interface';
import { productCreateSchema, productDeleteSchema, productEditSchema } from '@/schemas/product.schema';
import * as productService from '@/services/product.service';
import { ProductCreateInput, ProductDeletePayload, ProductEditInput } from '@/types/product.types';
import { sendSuccess } from '@/utils/response.util';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Lists all products.
 *
 * @route POST /api/products/list_products
 * @access manager, admin
 *
 * @description
 * -> Supports filters and pagination.
 *
 * @fields
 * -> page – Page number
 * -> limit – Items per page
 */
export const listProducts = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const products: ProductDocument[] = await productService.listProducts();
  sendSuccess(reply, products);
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
  const data = productCreateSchema.parse(request.body);
  const product = await productService.createProduct(data);
  sendSuccess(reply, product, 'Product created');
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
  const deleted: ProductDocument = await productService.deleteProduct(_id);
  sendSuccess(reply, deleted, 'Product deleted');
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
  const data: ProductEditInput = productEditSchema.parse(request.body);
  const updated: ProductDocument = await productService.editProduct(data);
  sendSuccess(reply, updated, 'Product updated');
};
