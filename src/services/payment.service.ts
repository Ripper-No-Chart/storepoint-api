import { PaymentDocument } from '@/interfaces/payment.interface';
import { SaleDocument } from '@/interfaces/sale.interface';
import { PaymentModel } from '@/models/payment.model';
import { SaleModel } from '@/models/sale.model';
import { CreatePaymentBody, ListPaymentsBySaleBody, PaymentAggregationResult } from '@/types/payment.types';
import { assertExists, assertFound } from '@/utils/assert.util';
import { Types } from 'mongoose';

/**
 * Creates a new payment and optionally marks the sale as paid.
 *
 * @description
 * -> Validates the sale exists.
 * -> Creates a payment record linked to the sale.
 * -> Checks total paid and marks sale as paid if complete.
 *
 * @param data - Payment creation payload
 * @returns Created payment document
 */
export const createPayment = async (data: CreatePaymentBody): Promise<PaymentDocument> => {
  const foundSale: SaleDocument | null = await SaleModel.findById(data.saleId);
  const sale: SaleDocument = assertFound(foundSale, 'Sale not found');

  const payment: PaymentDocument = await PaymentModel.create({
    sale: data.saleId,
    method: data.method,
    amount: data.amount,
    notes: data.notes
  });

  const aggregation: PaymentAggregationResult[] = await PaymentModel.aggregate<PaymentAggregationResult>([
    { $match: { sale: new Types.ObjectId(data.saleId) } },
    { $group: { _id: null, totalPaid: { $sum: '$amount' } } }
  ]);

  const totalPaid: number = aggregation[0]?.totalPaid ?? 0;

  if (sale.total && totalPaid >= sale.total) {
    sale.isPaid = true;
    await sale.save();
  }

  return assertExists(await payment.save(), 'Failed to create payment');
};

/**
 * Lists all payments associated with a sale.
 *
 * @description
 * -> Queries all payments using saleId.
 * -> Returns a list of PaymentDocuments sorted by creation date.
 *
 * @param data - Payload containing saleId
 * @returns Array of payment documents
 */
export const listPaymentsBySale = async (data: ListPaymentsBySaleBody): Promise<PaymentDocument[]> => {
  return await PaymentModel.find({ sale: data.saleId }).sort({ createdAt: -1 }).lean<PaymentDocument[]>();
};
