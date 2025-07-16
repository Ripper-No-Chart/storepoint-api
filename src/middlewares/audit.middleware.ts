import { HTTP_STATUS } from '@/constants/http.constants';
import { AuditLogModel } from '@/models/audit.model';
import { authUserSchema } from '@/schemas/auth.schema';
import { AuditLogSchema } from '@/types/audit.types';
import { AuthUser } from '@/types/auth.types';
import { createError } from '@/utils/error.util';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Middleware to persist audit logs for user actions.
 *
 * @description
 * -> Validates user identity and request context.
 * -> Persists endpoint usage in the AuditLog collection.
 * -> Must be registered after authentication middleware.
 *
 * @returns Fastify preHandler
 */
export const auditMiddleware = async (request: FastifyRequest, _reply: FastifyReply): Promise<void> => {
  const rawUser: unknown = request.user;

  const parseResult = authUserSchema.safeParse(rawUser);
  if (!parseResult.success) return;

  const user: AuthUser = parseResult.data;
  const endpoint: string = (request as any).routerPath || request.url;

  const auditPayload: AuditLogSchema = {
    endpoint,
    method: request.method,
    userId: String(user._id),
    userName: user.name,
    createdAt: new Date(),
    payload: request.body
  };

  try {
    await AuditLogModel.create(auditPayload);
  } catch {
    throw createError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Audit log failed');
  }
};
