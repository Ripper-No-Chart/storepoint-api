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
    if ((request.body as Record<string, unknown>) && typeof (request.body as Record<string, unknown>) === 'object') {
      for (const key in request.body as Record<string, unknown>) {
        const value: unknown = (request.body as Record<string, unknown>)[key];
        if (typeof value === 'string') {
          (request.body as Record<string, unknown>)[key] = value.trim();
        }
      }
    }
  });
};
