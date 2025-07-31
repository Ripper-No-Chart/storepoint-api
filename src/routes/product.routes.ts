import { Operation } from '@/constants/roles.constants';
import { UserRole } from '@/constants/user.constants';
import {
  createProduct,
  deleteProduct,
  editProduct,
  listCriticalProducts,
  listProducts
} from '@/controllers/product.controller';
import { auditMiddleware } from '@/middlewares/audit.middleware';
import { buildAuthenticate } from '@/middlewares/authenticate';
import { permit } from '@/middlewares/permit.middleware';
import { requireRole } from '@/middlewares/require-role.middleware';
import { FastifyInstance, preHandlerHookHandler } from 'fastify';

/**
 * Product Routes.
 *
 * @description
 * -> Endpoints to manage products (create, update, delete, list).
 * -> Authenticated users have access, but mutating operations are restricted to admin only.
 */
export const productRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const authenticate: preHandlerHookHandler = buildAuthenticate(fastify);

  fastify.post('/list_products', {
    preHandler: [
      authenticate,
      requireRole(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER),
      permit(Operation.LIST_PRODUCT),
      auditMiddleware
    ],
    handler: listProducts
  });

  fastify.post('/list_critical', {
    preHandler: [
      authenticate,
      requireRole(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER),
      permit(Operation.LIST_PRODUCT),
      auditMiddleware
    ],
    handler: listCriticalProducts
  });

  fastify.post('/create_product', {
    preHandler: [authenticate, requireRole(UserRole.ADMIN), permit(Operation.CREATE_PRODUCT), auditMiddleware],
    handler: createProduct
  });

  fastify.post('/edit_product', {
    preHandler: [authenticate, requireRole(UserRole.ADMIN), permit(Operation.EDIT_PRODUCT), auditMiddleware],
    handler: editProduct
  });

  fastify.post('/delete_product', {
    preHandler: [authenticate, requireRole(UserRole.ADMIN), permit(Operation.DELETE_PRODUCT), auditMiddleware],
    handler: deleteProduct
  });
};
