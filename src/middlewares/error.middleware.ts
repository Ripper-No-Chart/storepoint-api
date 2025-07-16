import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

import { HTTP_STATUS } from '@/constants/http.constants';

/**
 * Global error handler for unhandled exceptions.
 *
 * @hook Fastify setErrorHandler
 *
 * @description
 * -> Catches all unhandled errors in the request lifecycle.
 * -> Formats the error response with status code, message, and success flag.
 * -> Defaults to 500 Internal Server Error if statusCode is not defined.
 *
 * @param error - The thrown Fastify error object
 * @param request - Incoming Fastify request
 * @param reply - Fastify reply instance used to send the response
 */
export const errorHandler = (error: FastifyError, _request: FastifyRequest, reply: FastifyReply): void => {
  const statusCode: number = error.statusCode ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;

  reply.status(statusCode).send({
    success: false,
    message: error.message,
    statusCode
  });
};
