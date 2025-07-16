import 'fastify';
import { preHandlerHookHandler } from 'fastify';
import { UserPayload } from '@/interfaces/auth.interface';

/**
 * Extends Fastify types to include:
 * - `authenticate` decorator on FastifyInstance
 * - `user` property on FastifyRequest
 *
 * @description
 * -> Adds custom `authenticate` hook handler to `FastifyInstance`.
 * -> Ensures that the `user` property is available on the `FastifyRequest` object, representing the authenticated user payload.
 */
declare module 'fastify' {
  interface FastifyInstance {
    authenticate: preHandlerHookHandler;
  }

  interface FastifyRequest {
    user: UserPayload;
  }
}
