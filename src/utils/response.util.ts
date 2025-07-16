import { FastifyReply } from 'fastify';
import { HTTP_STATUS } from '@/constants/http.constants';

/**
 * Unified response handler for successful requests.
 *
 * @description
 * -> Handles successful responses and returns a standardized structure.
 * -> Can include optional data and a custom message.
 * -> Defaults to HTTP status 200 if no status is provided.
 *
 * @param reply - Fastify reply instance
 * @param data - Optional response payload
 * @param message - Optional message
 * @param status - HTTP status code (default: 200)
 * @returns Fastify reply
 */
export const sendSuccess = (
  reply: FastifyReply,
  data: unknown = null,
  message?: string,
  status: number = HTTP_STATUS.OK
): FastifyReply => {
  return reply.status(status).send({
    success: true,
    message,
    data
  });
};
