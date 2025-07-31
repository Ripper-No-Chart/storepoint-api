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
  sendSuccess(reply, await categoryService.listCategories());
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
  sendSuccess(
    reply,
    await categoryService.createCategory(categoryCreateSchema.parse(request.body)),
    'Category created'
  );
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
  sendSuccess(reply, await categoryService.deleteCategory(_id), 'Category deleted');
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
  sendSuccess(reply, await categoryService.editCategory(categoryEditSchema.parse(request.body)), 'Category updated');
};
