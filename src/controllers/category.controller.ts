import { CategoryDocument } from '@/interfaces/category.interface';
import { categoryCreateSchema, categoryDeleteSchema, categoryEditSchema } from '@/schemas/category.schema';
import * as categoryService from '@/services/category.service';
import { CategoryCreateInput, CategoryDeletePayload, CategoryEditInput } from '@/types/category.types';
import { sendSuccess } from '@/utils/response.util';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Lists all product categories.
 *
 * @route POST /api/categories/list_categories
 * @access manager, admin
 *
 * @description
 * -> Used in product classification.
 *
 * @fields
 * // none
 */

export const listCategories = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const categories: CategoryDocument[] = await categoryService.listCategories();
  sendSuccess(reply, categories);
};

/**
 * Creates a new category.
 *
 * @route POST /api/categories/create_category
 * @access manager, admin
 *
 * @description
 * -> Requires name and optional description.
 *
 * @fields
 * -> name – Category name  
 * -> description – Optional
 */

export const createCategory = async (
  request: FastifyRequest<{ Body: CategoryCreateInput }>,
  reply: FastifyReply
): Promise<void> => {
  const data: CategoryCreateInput = categoryCreateSchema.parse(request.body);
  const category: CategoryDocument = await categoryService.createCategory(data);
  sendSuccess(reply, category, 'Category created');
};

/**
 * Deletes a category by ID.
 *
 * @route POST /api/categories/delete_category
 * @access manager, admin
 *
 * @description
 * -> Only if not in use.
 *
 * @fields
 * -> id – Category ID
 */

export const deleteCategory = async (
  request: FastifyRequest<{ Body: CategoryDeletePayload }>,
  reply: FastifyReply
): Promise<void> => {
  const { _id }: CategoryDeletePayload = categoryDeleteSchema.parse(request.body);
  const deleted: CategoryDocument = await categoryService.deleteCategory(_id);
  sendSuccess(reply, deleted, 'Category deleted');
};

/**
 * Updates a category.
 *
 * @route POST /api/categories/edit_category
 * @access manager, admin
 *
 * @description
 * -> Can modify name or description.
 *
 * @fields
 * -> id – Category ID  
 * -> name – New name  
 * -> description – New description
 */

export const editCategory = async (
  request: FastifyRequest<{ Body: CategoryEditInput }>,
  reply: FastifyReply
): Promise<void> => {
  const data: CategoryEditInput = categoryEditSchema.parse(request.body);
  const updated: CategoryDocument = await categoryService.editCategory(data);
  sendSuccess(reply, updated, 'Category updated');
};
