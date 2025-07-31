import { ProductDocument } from '@/interfaces/product.interface';
import { ProductModel } from '@/models/product.model';
import { ProductCreateInput, ProductDeletePayload, ProductEditInput, ProductQueryDto } from '@/types/product.types';
import { assertExists, assertFound } from '@/utils/assert.util';
import { FilterQuery } from 'mongoose';

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
  return assertExists(await new ProductModel(data).save(), 'Failed to create product');
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
  return ProductModel.find().lean<ProductDocument[]>();
};

/**
 * Retrieves a filtered and paginated list of products.
 *
 * @description
 * -> Applies optional search and criticalOnly filters.
 * -> Returns paginated results with total count.
 *
 * @param dto - ProductQueryDto with filters and pagination config
 * @returns Object with paginated product data and metadata
 */
export const listProductsWithFilters = async (
  dto: ProductQueryDto
): Promise<{
  data: ProductDocument[];
  total: number;
  page: number;
  limit: number;
}> => {
  return {
    ...(await (async () => {
      const query: FilterQuery<ProductDocument> = {
        ...(dto.search && {
          $or: [{ name: { $regex: dto.search, $options: 'i' } }, { code: { $regex: dto.search, $options: 'i' } }]
        }),
        ...(dto.criticalOnly && { $expr: { $lte: ['$stock', '$criticalStock'] } })
      };

      const [data, total] = await Promise.all([
        ProductModel.find(query)
          .skip((dto.page - 1) * dto.limit)
          .limit(dto.limit)
          .lean<ProductDocument[]>(),

        ProductModel.countDocuments(query)
      ]);

      return { data, total };
    })()),
    page: dto.page,
    limit: dto.limit
  };
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
  return assertFound(await ProductModel.findByIdAndDelete(_id).lean<ProductDocument | null>(), 'Product not found');
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
  return assertFound(
    await ProductModel.findByIdAndUpdate(_id, update, {
      new: true
    }).lean<ProductDocument | null>(),
    'Product not found'
  );
};
