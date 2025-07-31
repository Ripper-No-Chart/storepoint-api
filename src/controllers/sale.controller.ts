import { saleCreateSchema, saleGetByIdSchema, SaleQuerySchema } from '@/schemas/sale.schema';
import * as saleServices from '@/services/sale.service';
import { SaleQueryDto } from '@/types/sale.types';
import { getUserIdOrThrow } from '@/utils/get-user.util';
import { sendSuccess } from '@/utils/response.util';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Registers a new sale.
 *
 * @route POST /api/sales/create_sale
 * @access cashier, manager
 *
 * @description
 * -> Requires list of products and quantities.
 * -> Updates stock and records the sale.
 *
 * @fields
 * -> products – Sold products with quantity and price
 * -> total    – Total sale amount
 * -> notes    – Optional observations
 */
export const createSale = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  sendSuccess(
    reply,
    await saleServices.createSale(saleCreateSchema.parse(request.body), getUserIdOrThrow(request)),
    'Sale created'
  );
};

/**
 * Lists sales with filters and pagination.
 *
 * @route POST /api/sales/list_sales
 * @access cashier, manager
 *
 * @description
 * -> Accepts optional search and date range filters.
 * -> Returns paginated sales with cashier and product info.
 *
 * @body
 * -> search: string (optional)
 * -> from: string (ISO date, optional)
 * -> to: string (ISO date, optional)
 * -> page: number (default 1)
 * -> limit: number (default 10)
 */
export const listSales = async (
  request: FastifyRequest<{ Body: SaleQueryDto }>,
  reply: FastifyReply
): Promise<void> => {
  sendSuccess(reply, await saleServices.listSalesWithFilters(SaleQuerySchema.parse(request.body)), 'Sales retrieved');
};

/**
 * Fetches a single sale by ID.
 *
 * @route POST /api/sales/get_sale_by_id
 * @access cashier, manager
 *
 * @description
 * -> Retrieves sale details including product breakdown.
 *
 * @fields
 * -> id – Sale ID
 */
export const getSaleById = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  sendSuccess(reply, await saleServices.getSaleById(saleGetByIdSchema.parse(request.body).saleId), 'Sale retrieved');
};
