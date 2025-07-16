import { Operation } from '@/constants/roles.constants';
import { UserRole } from '@/constants/user.constants';
import { createCategory, deleteCategory, editCategory, listCategories } from '@/controllers/category.controller';
import { auditMiddleware } from '@/middlewares/audit.middleware';
import { buildAuthenticate } from '@/middlewares/authenticate';
import { permit } from '@/middlewares/permit.middleware';
import { requireRole } from '@/middlewares/require-role.middleware';
import { FastifyInstance, preHandlerHookHandler } from 'fastify';

/**
 * Category Routes.
 *
 * @description
 * -> Endpoints to manage product categories.
 * -> Access restricted by role and operation permissions.
 */
export const categoryRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const authenticate: preHandlerHookHandler = buildAuthenticate(fastify);

  fastify.post('/list_categories', {
    preHandler: [
      authenticate,
      requireRole(UserRole.ADMIN, UserRole.MANAGER, UserRole.STOCKIST),
      permit(Operation.LIST_CATEGORY),
      auditMiddleware
    ],
    handler: listCategories
  });

  fastify.post('/create_category', {
    preHandler: [authenticate, requireRole(UserRole.ADMIN), permit(Operation.CREATE_CATEGORY), auditMiddleware],
    handler: createCategory
  });

  fastify.post('/edit_category', {
    preHandler: [authenticate, requireRole(UserRole.ADMIN), permit(Operation.EDIT_CATEGORY), auditMiddleware],
    handler: editCategory
  });

  fastify.post('/delete_category', {
    preHandler: [authenticate, requireRole(UserRole.ADMIN), permit(Operation.DELETE_CATEGORY), auditMiddleware],
    handler: deleteCategory
  });
};
