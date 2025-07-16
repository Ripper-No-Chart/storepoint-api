import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { config } from 'dotenv';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { authPlugin } from '@/middlewares/auth.middleware';
import { errorHandler } from '@/middlewares/error.middleware';
import { sanitizePlugin } from '@/middlewares/sanitize.middleware';
import { registerRoutes } from '@/routes';

config();

/**
 * Bootstraps and configures the Fastify application instance.
 *
 * @description
 * -> Registers essential plugins: CORS, JWT, sanitization, and custom authentication.
 * -> Applies global error handling middleware.
 * -> Mounts all feature-specific route modules under the `/api` prefix via `registerRoutes`.
 * -> This function serves as the centralized initializer for the app and must be called before starting the server.
 *
 * @param fastify - The Fastify instance created in `index.ts`
 * @returns Void
 */
export const buildApp: FastifyPluginAsync = async (fastify: FastifyInstance): Promise<void> => {
  // Register core third-party plugins
  await fastify.register(cors);
  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET || 'changeme'
  });

  // Register global middlewares
  fastify.setErrorHandler(errorHandler);
  await fastify.register(sanitizePlugin);
  await fastify.register(authPlugin);

  // Register all app routes under /api/*
  await registerRoutes(fastify);
};
