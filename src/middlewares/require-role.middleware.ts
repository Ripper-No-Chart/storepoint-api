import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { HTTP_STATUS } from '@/constants/http.constants';
import { UserRole } from '@/constants/user.constants';
import { UserPayload } from '@/interfaces/auth.interface';
import { isUserPayload } from '@/utils/guard.util';

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
    const rawUser: unknown = req.user;

    if (!isUserPayload(rawUser)) {
      reply.status(HTTP_STATUS.FORBIDDEN).send({ message: 'Forbidden: invalid user payload' });
      return;
    }

    const user: UserPayload = rawUser;

    if (!roles.includes(user.role)) {
      reply.status(HTTP_STATUS.FORBIDDEN).send({ message: 'Forbidden: insufficient role' });
      return;
    }

    done();
  };
}
