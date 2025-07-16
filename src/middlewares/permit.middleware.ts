import { HTTP_STATUS } from '@/constants/http.constants';
import { Operation } from '@/constants/roles.constants';
import { UserRole } from '@/constants/user.constants';
import { UserPayload } from '@/interfaces/auth.interface';
import { RolePermissions } from '@/middlewares/permissions.map';
import { createError } from '@/utils/error.util';
import { isUserPayload } from '@/utils/guard.util';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Middleware to check permission for a specific operation.
 *
 * @description
 * -> Verifies if the current user role includes the requested operation.
 * -> ADMIN has implicit access to all operations.
 * -> Denies with 403 if permission is missing.
 *
 * @param operation - The operation to check against user role
 * @returns Fastify preHandler
 */
export const permit = (operation: Operation) => {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const rawUser: unknown = request.user;

    if (!isUserPayload(rawUser)) {
      return reply.status(HTTP_STATUS.FORBIDDEN).send(createError(HTTP_STATUS.FORBIDDEN, 'Invalid user payload'));
    }

    const user: UserPayload = rawUser;

    if (!user.role) {
      return reply.status(HTTP_STATUS.FORBIDDEN).send(createError(HTTP_STATUS.FORBIDDEN, 'Missing user role'));
    }

    const role: UserRole = user.role;
    const permissions: Operation[] = RolePermissions[role] ?? [];
    const isAllowed: boolean = permissions.includes(operation);

    if (!isAllowed) {
      return reply.status(HTTP_STATUS.FORBIDDEN).send(createError(HTTP_STATUS.FORBIDDEN, 'Operation not permitted'));
    }
  };
};
