import { SaleDocument } from '@/interfaces/sale.interface';
import { saleCreateSchema, saleGetByIdSchema } from '@/schemas/sale.schema';
import * as saleServices from '@/services/sale.service';
import { CreateSaleBody, GetSaleByIdBody } from '@/types/sale.types';
import { getUserIdOrThrow } from '@/utils/get-user.util';
import { sendSuccess } from '@/utils/response.util';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';

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
  const userId: Types.ObjectId = getUserIdOrThrow(request);
  const data: CreateSaleBody = saleCreateSchema.parse(request.body);
  const sale: SaleDocument = await saleServices.createSale(data, userId);
  sendSuccess(reply, sale, 'Sale created');
};

/**
 * Lists all sales.
 *
 * @route POST /api/sales/list_sales
 * @access cashier, manager
 *
 * @description
 * -> Supports filtering by date, user, or product.
 *
 * @fields
 * -> startDate – Optional filter start
 * -> endDate   – Optional filter end
 * -> cashierId – Optional user filter
 */
export const listSales = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const sales: SaleDocument[] = await saleServices.listSales();
  sendSuccess(reply, sales, 'Sales retrieved');
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
  const data: GetSaleByIdBody = saleGetByIdSchema.parse(request.body);
  const sale: SaleDocument = await saleServices.getSaleById(data.saleId);
  sendSuccess(reply, sale, 'Sale retrieved');
};
