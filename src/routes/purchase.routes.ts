import { Operation } from '@/constants/roles.constants';
import { UserRole } from '@/constants/user.constants';
import { createPurchase, listPurchases } from '@/controllers/purchase.controller';
import { auditMiddleware } from '@/middlewares/audit.middleware';
import { buildAuthenticate } from '@/middlewares/authenticate';
import { permit } from '@/middlewares/permit.middleware';
import { requireRole } from '@/middlewares/require-role.middleware';
import { FastifyInstance, preHandlerHookHandler } from 'fastify';

/**
 * Purchase Routes.
 *
 * @description
 * -> Endpoints to manage purchases (create, list).
 * -> Restricted by role and specific operation permissions.
 */
export const purchaseRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const authenticate: preHandlerHookHandler = buildAuthenticate(fastify);

  fastify.post('/list_purchases', {
    preHandler: [
      authenticate,
      requireRole(UserRole.ADMIN, UserRole.MANAGER, UserRole.STOCKIST),
      permit(Operation.LIST_PURCHASE),
      auditMiddleware
    ],
    handler: listPurchases
  });

  fastify.post('/create_purchase', {
    preHandler: [
      authenticate,
      requireRole(UserRole.ADMIN, UserRole.STOCKIST),
      permit(Operation.CREATE_PURCHASE),
      auditMiddleware
    ],
    handler: createPurchase
  });
};
