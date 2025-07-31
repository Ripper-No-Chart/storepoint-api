import { HTTP_STATUS } from '@/constants/http.constants';
import { UserRole } from '@/constants/user.constants';
import { isUserPayload } from '@/utils/guard.util';
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

/**
 * Role-based access control middleware.
 *
 * @brief
 * -> Allows authenticated users with any of the given roles.
 * -> Returns 403 Forbidden if role check fails.
 *
 * @param roles - One or more required roles for access
 */
export function requireRole(...roles: UserRole[]) {
  return (req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): void => {
    if (!isUserPayload(req.user)) {
      reply.status(HTTP_STATUS.FORBIDDEN).send({ message: 'Forbidden: invalid user payload' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      reply.status(HTTP_STATUS.FORBIDDEN).send({ message: 'Forbidden: insufficient role' });
      return;
    }

    done();
  };
}
