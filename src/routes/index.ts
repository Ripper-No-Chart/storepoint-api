import { FastifyInstance } from 'fastify';

import { authRoutes } from './auth.routes';
import { categoryRoutes } from './category.routes';
import { healthRoutes } from './healt.routes';
import { productRoutes } from './product.routes';
import { purchaseRoutes } from './purchase.routes';
import { salesRoutes } from './sales.routes';
import { supplierRoutes } from './supplier.routes';
import { userRoutes } from './user.routes';
import { paymentRoutes } from './payment.routes';
import { reportRoutes } from './report.routes';
import { rmaRoutes } from './rma.routes';

/**
 * Registers all application routes with their respective route prefixes.
 *
 * @description
 * -> This centralizes route registration, maintaining clean separation
 * -> between domain-specific route files and the app bootstrap logic.
 *
 * @param fastify - Fastify application instance
 */
export const registerRoutes = async (fastify: FastifyInstance): Promise<void> => {
  await fastify.register(authRoutes, { prefix: '/api/auth' });
  await fastify.register(userRoutes, { prefix: '/api/users' });
  await fastify.register(productRoutes, { prefix: '/api/products' });
  await fastify.register(categoryRoutes, { prefix: '/api/categories' });
  await fastify.register(supplierRoutes, { prefix: '/api/suppliers' });
  await fastify.register(purchaseRoutes, { prefix: '/api/purchases' });
  await fastify.register(paymentRoutes, { prefix: '/api/payments' });
  await fastify.register(salesRoutes, { prefix: '/api/sales' });
  await fastify.register(reportRoutes, { prefix: '/api/report' });
  await fastify.register(rmaRoutes, { prefix: '/api/rma' });
  await fastify.register(healthRoutes, { prefix: '/api' });
};
