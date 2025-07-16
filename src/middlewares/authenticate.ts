import { FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction, preHandlerHookHandler } from 'fastify';

/**
 * Builds a safe Fastify preHandler wrapper around `fastify.authenticate`.
 *
 * @brief
 * -> Ensures the server doesn't crash if the decorator is undefined.
 * -> Emits a warning and skips auth if not registered.
 */

/**
 * Middleware for authenticating users and checking their permissions.
 *
 * @description
 * -> Checks the presence and validity of JWT tokens in requests.
 * -> Verifies user roles and permissions before processing the request.
 *
 * @access private
 * @throws
 * -> 401 Unauthorized if token is missing or invalid
 * -> 403 Forbidden if the user does not have the required role
 */

/**
 * Middleware for authenticating users and checking their permissions.
 *
 * @description
 * -> Checks the presence and validity of JWT tokens in requests.
 * -> Verifies user roles and permissions before processing the request.
 *
 * @access private
 * @throws
 * -> 401 Unauthorized if token is missing or invalid
 * -> 403 Forbidden if the user does not have the required role
 */
export function buildAuthenticate(fastify: FastifyInstance): preHandlerHookHandler {
  return function authenticate(req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): void {
    if (typeof fastify.authenticate !== 'function') {
      console.warn('⚠️ fastify.authenticate is not defined. Skipping auth preHandler.');
      return done();
    }
    fastify.authenticate(req, reply, done);
  };
}
