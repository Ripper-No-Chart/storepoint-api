import { Operation } from '@/constants/roles.constants';
import { UserRole } from '@/constants/user.constants';
import { createSale, listSales } from '@/controllers/sale.controller';
import { auditMiddleware } from '@/middlewares/audit.middleware';
import { buildAuthenticate } from '@/middlewares/authenticate';
import { permit } from '@/middlewares/permit.middleware';
import { requireRole } from '@/middlewares/require-role.middleware';
import { FastifyInstance, preHandlerHookHandler } from 'fastify';

/**
 * Sales Routes.
 *
 * @description
 * -> Endpoints to manage sales (list, create, delete).
 * -> Access controlled by role and operation permissions.
 */
export const salesRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const authenticate: preHandlerHookHandler = buildAuthenticate(fastify);

  fastify.post('/list_sales', {
    preHandler: [
      authenticate,
      requireRole(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER),
      permit(Operation.LIST_SALES),
      auditMiddleware
    ],
    handler: listSales
  });

  fastify.post('/create_sale', {
    preHandler: [
      authenticate,
      requireRole(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER),
      permit(Operation.CREATE_SALE),
      auditMiddleware
    ],
    handler: createSale
  });
};
