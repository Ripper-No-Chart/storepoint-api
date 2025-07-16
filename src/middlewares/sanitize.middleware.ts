import { FastifyPluginAsync } from 'fastify';

/**
 * Sanitizes incoming request body.
 *
 * @plugin
 * @description
 * -> Trims whitespace from all string values in the request body.
 * -> Executes before validation (hook: preValidation).
 */
export const sanitizePlugin: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('preValidation', async (request) => {
    const body: Record<string, unknown> = request.body as Record<string, unknown>;

    if (body && typeof body === 'object') {
      for (const key in body) {
        const value = body[key];
        if (typeof value === 'string') {
          body[key] = value.trim();
        }
      }
    }
  });
};
