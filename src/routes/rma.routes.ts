import { Operation } from '@/constants/roles.constants';
import { UserRole } from '@/constants/user.constants';
import { createRMA, listRMAsBySale } from '@/controllers/rma.controller';
import { auditMiddleware } from '@/middlewares/audit.middleware';
import { buildAuthenticate } from '@/middlewares/authenticate';
import { permit } from '@/middlewares/permit.middleware';
import { requireRole } from '@/middlewares/require-role.middleware';
import { FastifyInstance, preHandlerHookHandler } from 'fastify';

/**
 * RMA Routes.
 *
 * @description
 * -> Endpoints to manage return merchandise authorizations (RMAs).
 */
export const rmaRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const authenticate: preHandlerHookHandler = buildAuthenticate(fastify);

  fastify.post('/list_rmas', {
    preHandler: [
      authenticate,
      requireRole(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER),
      permit(Operation.LIST_RETURN),
      auditMiddleware
    ],
    handler: listRMAsBySale
  });

  fastify.post('/create_rma', {
    preHandler: [
      authenticate,
      requireRole(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER),
      permit(Operation.CREATE_RETURN),
      auditMiddleware
    ],
    handler: createRMA
  });
};
