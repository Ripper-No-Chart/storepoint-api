import { FastifyRequest } from 'fastify';
import { Types } from 'mongoose';
import { HTTP_STATUS } from '@/constants/http.constants';
import { UserPayload } from '@/interfaces/auth.interface';
import { createError } from '@/utils/error.util';
import { isUserPayload } from '@/utils/guard.util';

/**
 * Extracts and validates the authenticated user from request.
 *
 * @param request - FastifyRequest with JWT user payload
 * @returns Validated and typed UserPayload object
 *
 * @throws 401 if user is missing or invalid
 */
export function getUserOrThrow(request: FastifyRequest): UserPayload {
  if (!isUserPayload(request.user)) {
    throw createError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized');
  }

  return request.user;
}

/**
 * Extracts and validates the authenticated user's ObjectId.
 *
 * @param request - FastifyRequest with JWT user payload
 * @returns ObjectId extracted from the validated user
 *
 * @throws 401 if user or _id is missing or invalid
 */
export function getUserIdOrThrow(request: FastifyRequest): Types.ObjectId {
  return new Types.ObjectId(getUserOrThrow(request)._id);
}
