import { Operation } from '@/constants/roles.constants';
import { UserRole } from '@/constants/user.constants';
import { reportInventoryLowStock, reportPayments, reportSales } from '@/controllers/report.controller';
import { auditMiddleware } from '@/middlewares/audit.middleware';
import { buildAuthenticate } from '@/middlewares/authenticate';
import { permit } from '@/middlewares/permit.middleware';
import { requireRole } from '@/middlewares/require-role.middleware';
import { FastifyInstance, preHandlerHookHandler } from 'fastify';

/**
 * Report Routes.
 *
 * @description
 * -> Endpoints to generate sales, inventory, and payment reports.
 * -> Access restricted to users with report permission.
 */
export const reportRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const authenticate: preHandlerHookHandler = buildAuthenticate(fastify);

  fastify.post('/report_sales', {
    preHandler: [
      authenticate,
      requireRole(UserRole.ADMIN, UserRole.MANAGER),
      permit(Operation.GENERATE_REPORT),
      auditMiddleware
    ],
    handler: reportSales
  });

  fastify.post('/report_inventory_low_stock', {
    preHandler: [
      authenticate,
      requireRole(UserRole.ADMIN, UserRole.MANAGER, UserRole.STOCKIST),
      permit(Operation.GENERATE_REPORT),
      auditMiddleware
    ],
    handler: reportInventoryLowStock
  });

  fastify.post('/report_payments', {
    preHandler: [
      authenticate,
      requireRole(UserRole.ADMIN, UserRole.MANAGER),
      permit(Operation.GENERATE_REPORT),
      auditMiddleware
    ],
    handler: reportPayments
  });
};
