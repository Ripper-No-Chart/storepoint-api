import { IHealthReport } from '@/interfaces/health.interface';
import { getHealthReport } from '@/utils/health.util';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

/**
 * Registers the health check route.
 *
 * @description
 * -> `GET /api/health`: Returns status of server and MongoDB connection.
 * -> Useful for uptime monitoring, reverse proxy health checks, and CI pipelines.
 * -> Response includes formatted uptime, memory, hostname, timestamp, and Mongo state.
 *
 * @param fastify - Fastify server instance
 */
export const healthRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get('/health', async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const report: IHealthReport = getHealthReport();
    reply.status(report.statusCode).send(report.payload);
  });
};
