import { paymentCreateSchema, paymentListSchema } from '@/schemas/payment.schema';
import * as paymentServices from '@/services/payment.service';
import { sendSuccess } from '@/utils/response.util';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Registers a new payment.
 *
 * @route POST /api/payments/create_payment
 * @access cashier, manager, admin
 *
 * @description
 * -> Parses and validates input using Zod.
 * -> Links payment to a sale and updates sale status if needed.
 *
 * @fields
 * -> saleId    – Sale for which the payment is made
 * -> method    – Payment method
 * -> amount    – Payment amount
 * -> notes     – Optional notes
 */
export const createPayment = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  sendSuccess(reply, await paymentServices.createPayment(paymentCreateSchema.parse(request.body)), 'Payment created');
};

/**
 * Lists all payments for a sale.
 *
 * @route POST /api/payments/list_payments_by_sale
 * @access cashier, manager, admin
 *
 * @description
 * -> Returns all payments made for the provided saleId.
 *
 * @fields
 * -> saleId    – Sale identifier to list payments for
 */
export const listPaymentsBySale = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  sendSuccess(
    reply,
    await paymentServices.listPaymentsBySale(paymentListSchema.parse(request.body)),
    'Payments retrieved'
  );
};
