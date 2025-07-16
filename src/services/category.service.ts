import { CategoryDocument } from '@/interfaces/category.interface';
import { CategoryModel } from '@/models/category.model';
import { CategoryCreateInput, CategoryDeletePayload, CategoryEditInput } from '@/types/category.types';
import { assertExists, assertFound } from '@/utils/assert.util';

/**
 * Creates a new category in the database.
 *
 * @description
 * -> Persists a new category using the provided payload.
 * -> Returns the created category document.
 *
 * @param data - Category creation input
 * @returns Created category document
 */
export const createCategory = async (data: CategoryCreateInput): Promise<CategoryDocument> => {
  const category: CategoryDocument = new CategoryModel(data);
  return assertExists(await category.save(), 'Failed to create category');
};

/**
 * Retrieves all categories from the database.
 *
 * @description
 * -> Fetches all category records.
 *
 * @returns Array of category documents
 */
export const listCategories = async (): Promise<CategoryDocument[]> => {
  return await CategoryModel.find().lean<CategoryDocument[]>();
};

/**
 * Deletes a category by its ID.
 *
 * @description
 * -> Removes a category by its ObjectId.
 * -> Throws 404 if not found.
 *
 * @param _id - MongoDB ObjectId of the category
 * @returns Deleted category document
 */
export const deleteCategory = async (_id: CategoryDeletePayload['_id']): Promise<CategoryDocument> => {
  const deleted: CategoryDocument | null = await CategoryModel.findByIdAndDelete(_id).lean<CategoryDocument | null>();
  return assertFound(deleted, 'Category not found');
};

/**
 * Updates a category by its ID.
 *
 * @description
 * -> Applies updates to a category using provided data.
 * -> Throws 404 if the category is not found.
 *
 * @param data - Update payload
 * @returns Updated category document
 */
export const editCategory = async (data: CategoryEditInput): Promise<CategoryDocument> => {
  const { _id, ...update } = data;
  const updated: CategoryDocument | null = await CategoryModel.findByIdAndUpdate(_id, update, {
    new: true
  }).lean<CategoryDocument | null>();
  return assertFound(updated, 'Category not found');
};
