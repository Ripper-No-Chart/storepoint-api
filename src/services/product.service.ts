import { ProductDocument } from '@/interfaces/product.interface';
import { ProductModel } from '@/models/product.model';
import { ProductCreateInput, ProductDeletePayload, ProductEditInput } from '@/types/product.types';
import { assertExists, assertFound } from '@/utils/assert.util';

/**
 * Creates a new product in the database.
 *
 * @description
 * -> Persists a new product using the provided payload.
 *
 * @param data - Product creation input
 * @returns Created product document
 */
export const createProduct = async (data: ProductCreateInput): Promise<ProductDocument> => {
  const product: ProductDocument = new ProductModel(data);
  return assertExists(await product.save(), 'Failed to create product');
};

/**
 * Retrieves all products from the database.
 *
 * @description
 * -> Fetches all product records.
 *
 * @returns Array of product documents
 */
export const listProducts = async (): Promise<ProductDocument[]> => {
  return await ProductModel.find().lean<ProductDocument[]>();
};

/**
 * Deletes a product by its ID.
 *
 * @description
 * -> Removes a product by its ObjectId.
 * -> Throws 404 if not found.
 *
 * @param _id - MongoDB ObjectId of the product
 * @returns Deleted product document
 */
export const deleteProduct = async (_id: ProductDeletePayload['_id']): Promise<ProductDocument> => {
  const deleted: ProductDocument | null = await ProductModel.findByIdAndDelete(_id).lean<ProductDocument | null>();
  return assertFound(deleted, 'Product not found');
};

/**
 * Updates a product by its ID.
 *
 * @description
 * -> Applies updates to a product using provided data.
 * -> Throws 404 if the product is not found.
 *
 * @param data - Update payload
 * @returns Updated product document
 */
export const editProduct = async (data: ProductEditInput): Promise<ProductDocument> => {
  const { _id, ...update } = data;
  const updated: ProductDocument | null = await ProductModel.findByIdAndUpdate(_id, update, {
    new: true
  }).lean<ProductDocument | null>();
  return assertFound(updated, 'Product not found');
};
