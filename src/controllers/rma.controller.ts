import { rmaCreateSchema, rmaListSchema } from '@/schemas/rma.schema';
import * as rmaServices from '@/services/rma.service';
import { CreateRMABody, ListRMAsBySaleBody } from '@/types/rma.types';
import { getUserIdOrThrow } from '@/utils/get-user.util';
import { sendSuccess } from '@/utils/response.util';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Registers a new RMA (return).
 *
 * @route POST /api/rmas/create_rma
 * @access admin, manager, cashier
 *
 * @description
 * -> Parses and validates input using Zod.
 * -> Processes the return and restores stock.
 */
export const createRMA = async (
  request: FastifyRequest<{ Body: CreateRMABody }>,
  reply: FastifyReply
): Promise<void> => {
  sendSuccess(
    reply,
    await rmaServices.createRMA(rmaCreateSchema.parse(request.body), getUserIdOrThrow(request)),
    'RMA created'
  );
};

/**
 * Lists all RMAs for a sale.
 *
 * @route POST /api/rmas/list_rmas
 * @access admin, manager, cashier
 *
 * @description
 * -> Parses and validates saleId using Zod.
 * -> Returns the history of returns for a sale.
 */
export const listRMAsBySale = async (
  request: FastifyRequest<{ Body: ListRMAsBySaleBody }>,
  reply: FastifyReply
): Promise<void> => {
  sendSuccess(reply, await rmaServices.listRMAsBySale(rmaListSchema.parse(request.body)), 'RMAs retrieved');
};
