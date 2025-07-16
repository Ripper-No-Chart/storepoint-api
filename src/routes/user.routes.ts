import { Operation } from '@/constants/roles.constants';
import { UserRole } from '@/constants/user.constants';
import { createUser, deleteUser, editUser, listUsers } from '@/controllers/user.controller';
import { auditMiddleware } from '@/middlewares/audit.middleware';
import { buildAuthenticate } from '@/middlewares/authenticate';
import { permit } from '@/middlewares/permit.middleware';
import { requireRole } from '@/middlewares/require-role.middleware';
import { FastifyInstance, preHandlerHookHandler } from 'fastify';

/**
 * User Routes.
 *
 * @description
 * -> Endpoints to manage user data and credentials.
 * -> Admin-only for management operations. Self update open to any authenticated user.
 */
export const userRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const authenticate: preHandlerHookHandler = buildAuthenticate(fastify);

  fastify.post('/list_users', {
    preHandler: [authenticate, requireRole(UserRole.ADMIN), permit(Operation.LIST_USERS), auditMiddleware],
    handler: listUsers
  });

  fastify.post('/create_user', {
    preHandler: [authenticate, requireRole(UserRole.ADMIN), permit(Operation.CREATE_USER), auditMiddleware],
    handler: createUser
  });

  fastify.post('/edit_user', {
    preHandler: [authenticate, requireRole(UserRole.ADMIN), permit(Operation.EDIT_USER), auditMiddleware],
    handler: editUser
  });

  fastify.post('/delete_user', {
    preHandler: [authenticate, requireRole(UserRole.ADMIN), permit(Operation.DELETE_USER), auditMiddleware],
    handler: deleteUser
  });
};
