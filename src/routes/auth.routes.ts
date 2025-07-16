import { UserRole } from '@/constants/user.constants';
import { getMe, login, register } from '@/controllers/auth.controller';
import { auditMiddleware } from '@/middlewares/audit.middleware';
import { buildAuthenticate } from '@/middlewares/authenticate';
import { requireRole } from '@/middlewares/require-role.middleware';
import { FastifyInstance, preHandlerHookHandler } from 'fastify';

/**
 * Auth Routes.
 *
 * @description
 * -> Handles login, identity verification, and admin-only registration.
 */
export const authRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const authenticate: preHandlerHookHandler = buildAuthenticate(fastify);

  fastify.post('/login', { handler: login });

  fastify.post('/register', {
    preHandler: [authenticate, requireRole(UserRole.ADMIN), auditMiddleware],
    handler: register
  });

  fastify.post('/me', {
    preHandler: [authenticate],
    handler: getMe
  });
};
