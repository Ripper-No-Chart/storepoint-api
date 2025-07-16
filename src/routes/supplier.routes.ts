import { Operation } from '@/constants/roles.constants';
import { UserRole } from '@/constants/user.constants';
import { createSupplier, deleteSupplier, editSupplier, listSuppliers } from '@/controllers/supplier.controller';
import { auditMiddleware } from '@/middlewares/audit.middleware';
import { buildAuthenticate } from '@/middlewares/authenticate';
import { permit } from '@/middlewares/permit.middleware';
import { requireRole } from '@/middlewares/require-role.middleware';
import { FastifyInstance, preHandlerHookHandler } from 'fastify';

/**
 * Supplier Routes.
 *
 * @description
 * -> Endpoints to manage suppliers in the system.
 * -> Listing open to relevant roles; only admin may create/edit/delete.
 */
export const supplierRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const authenticate: preHandlerHookHandler = buildAuthenticate(fastify);

  fastify.post('/list_suppliers', {
    preHandler: [
      authenticate,
      requireRole(UserRole.ADMIN, UserRole.MANAGER, UserRole.STOCKIST),
      permit(Operation.LIST_SUPPLIER),
      auditMiddleware
    ],
    handler: listSuppliers
  });

  fastify.post('/create_supplier', {
    preHandler: [authenticate, requireRole(UserRole.ADMIN), permit(Operation.CREATE_SUPPLIER), auditMiddleware],
    handler: createSupplier
  });

  fastify.post('/edit_supplier', {
    preHandler: [authenticate, requireRole(UserRole.ADMIN), permit(Operation.EDIT_SUPPLIER), auditMiddleware],
    handler: editSupplier
  });

  fastify.post('/delete_supplier', {
    preHandler: [authenticate, requireRole(UserRole.ADMIN), permit(Operation.DELETE_SUPPLIER), auditMiddleware],
    handler: deleteSupplier
  });
};
