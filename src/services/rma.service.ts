import { HTTP_STATUS } from '@/constants/http.constants';
import { RMADocument } from '@/interfaces/rma.interface';
import { ProductModel } from '@/models/product.model';
import { RMAModel } from '@/models/rma.model';
import { SaleModel } from '@/models/sale.model';
import { CreateRMABody, ListRMAsBySaleBody } from '@/types/rma.types';
import { SaleLean } from '@/types/sale.types';
import { assertFound } from '@/utils/assert.util';
import { createError } from '@/utils/error.util';
import { Types } from 'mongoose';

/**
 * Creates a new RMA and restores stock.
 *
 * @description
 * -> Validates sale existence and item quantities.
 * -> Restores product stock and persists the RMA record.
 *
 * @param data - RMA creation input
 * @param userId - User who processes the RMA
 * @returns The created RMA document
 */
export const createRMA = async (data: CreateRMABody, userId: Types.ObjectId): Promise<RMADocument> => {
  if (
    !data.items.every(async (item: CreateRMABody['items'][number]): Promise<boolean> => {
      const match: SaleLean['products'][number] | undefined = assertFound(
        await SaleModel.findById(data.saleId).lean<SaleLean | null>(),
        'Sale not found'
      ).products.find((p: SaleLean['products'][number]): boolean => p.product.equals(item.productId));
      return !!match && match.quantity >= item.quantity;
    })
  ) {
    throw createError(HTTP_STATUS.BAD_REQUEST, 'Invalid return quantity for one or more products');
  }

  await Promise.all(
    data.items.map((item: CreateRMABody['items'][number]) =>
      ProductModel.findByIdAndUpdate(item.productId, {
        $inc: { stock: item.quantity }
      })
    )
  );

  return RMAModel.create({
    sale: new Types.ObjectId(data.saleId),
    items: data.items.map((item: CreateRMABody['items'][number]) => ({
      product: new Types.ObjectId(item.productId),
      quantity: item.quantity,
      reason: item.reason
    })),
    processedBy: userId,
    date: data.date ?? new Date()
  });
};

/**
 * Lists all RMAs for a sale.
 *
 * @description
 * -> Retrieves all RMA records linked to a sale.
 *
 * @param data - Input with saleId
 * @returns Array of RMAs for the sale
 */
export const listRMAsBySale = async (data: ListRMAsBySaleBody): Promise<RMADocument[]> => {
  return RMAModel.find({ sale: data.saleId })
    .populate('processedBy', 'name email')
    .populate('items.product', 'name')
    .sort({ createdAt: -1 })
    .lean<RMADocument[]>();
};
