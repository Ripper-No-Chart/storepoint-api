import { HTTP_STATUS } from '@/constants/http.constants';
import { AuditLogModel } from '@/models/audit.model';
import { authUserSchema } from '@/schemas/auth.schema';
import { AuthUser } from '@/types/auth.types';
import { createError } from '@/utils/error.util';
import { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';

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
export const auditMiddleware = async (req: FastifyRequest, _res: FastifyReply): Promise<void> => {
  const parsed: z.SafeParseReturnType<unknown, AuthUser> = authUserSchema.safeParse(req.user);
  if (!parsed.success) return;

  const endpoint: unknown =
    typeof (req as unknown as Record<string, unknown>).routerPath === 'string'
      ? (req as unknown as Record<string, unknown>).routerPath
      : req.url;

  try {
    await AuditLogModel.create({
      endpoint,
      method: req.method,
      userId: String(parsed.data._id),
      userName: parsed.data.name,
      createdAt: new Date(),
      payload: req.body
    });
  } catch {
    throw createError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Audit log failed');
  }
};
