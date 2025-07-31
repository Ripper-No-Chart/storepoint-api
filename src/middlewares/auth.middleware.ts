import { HTTP_STATUS } from '@/constants/http.constants';
import { isUserPayload } from '@/utils/guard.util';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';

/**
 * Auth plugin to protect routes using JWT verification.
 *
 * @brief
 * -> Registers `fastify.authenticate` decorator to verify and decode JWT.
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
export const authPlugin: FastifyPluginAsync = async (fastify): Promise<void> => {
  if (!fastify.jwt || typeof fastify.jwt.verify !== 'function') {
    throw new Error('@fastify/jwt not registered. Register it before authPlugin.');
  }

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      await request.jwtVerify();

      if (!isUserPayload(request.user)) {
        return reply.status(HTTP_STATUS.UNAUTHORIZED).send({ message: 'Unauthorized: invalid user payload' });
      }

      request.user = {
        _id: new Types.ObjectId(request.user._id),
        email: request.user.email,
        role: request.user.role
      };
    } catch (error) {
      reply.status(HTTP_STATUS.UNAUTHORIZED).send({
        message: `Unauthorized: ${(error as Error).message}`
      });
    }
  });
};
