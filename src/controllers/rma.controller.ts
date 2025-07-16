import { RMADocument } from '@/interfaces/rma.interface';
import { rmaCreateSchema, rmaListSchema } from '@/schemas/rma.schema';
import * as rmaServices from '@/services/rma.service';
import { CreateRMABody, ListRMAsBySaleBody } from '@/types/rma.types';
import { getUserIdOrThrow } from '@/utils/get-user.util';
import { sendSuccess } from '@/utils/response.util';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';

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
  const userId: Types.ObjectId = getUserIdOrThrow(request);
  const data: CreateRMABody = rmaCreateSchema.parse(request.body);
  const rma: RMADocument = await rmaServices.createRMA(data, userId);
  sendSuccess(reply, rma, 'RMA created');
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
  const data: ListRMAsBySaleBody = rmaListSchema.parse(request.body);
  const rmas: RMADocument[] = await rmaServices.listRMAsBySale(data);
  sendSuccess(reply, rmas, 'RMAs retrieved');
};
