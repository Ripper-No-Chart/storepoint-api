import { Operation } from '@/constants/roles.constants';
import { UserRole } from '@/constants/user.constants';
import { createPayment, listPaymentsBySale } from '@/controllers/payment.controller';
import { auditMiddleware } from '@/middlewares/audit.middleware';
import { buildAuthenticate } from '@/middlewares/authenticate';
import { permit } from '@/middlewares/permit.middleware';
import { requireRole } from '@/middlewares/require-role.middleware';
import { FastifyInstance, preHandlerHookHandler } from 'fastify';

/**
 * Payment Routes.
 *
 * @description
 * -> Endpoints to manage sale payments.
 * -> Accessible by cashier, manager, and admin.
 */
export const paymentRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const authenticate: preHandlerHookHandler = buildAuthenticate(fastify);

  fastify.post('/list_payments_by_sale', {
    preHandler: [
      authenticate,
      requireRole(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER),
      permit(Operation.LIST_PAYMENT),
      auditMiddleware
    ],
    handler: listPaymentsBySale
  });

  fastify.post('/create_payment', {
    preHandler: [
      authenticate,
      requireRole(UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER),
      permit(Operation.CREATE_PAYMENT),
      auditMiddleware
    ],
    handler: createPayment
  });
};
