import { SaleDocument } from '@/interfaces/sale.interface';
import { SaleModel } from '@/models/sale.model';
import { CreateSaleBody } from '@/types/sale.types';
import { adjustStockOnSale } from '@/utils/adjust-stock.util';
import { assertExists } from '@/utils/assert.util';
import { Types } from 'mongoose';

/**
 * Creates a new sale in the database.
 *
 * @description
 * -> Adjusts stock quantities before persisting.
 * -> Saves the new sale document and returns it.
 * -> Fails with 500 if creation fails.
 *
 * @param data - Sale creation input
 * @param cashierId - MongoDB ObjectId of cashier
 * @returns The created Sale document
 */
export const createSale = async (data: CreateSaleBody, cashierId: Types.ObjectId): Promise<SaleDocument> => {
  await adjustStockOnSale(data.products);

  return assertExists(
    await new SaleModel({
      cashier: cashierId,
      products: data.products.map((p: CreateSaleBody['products'][number]) => ({
        product: new Types.ObjectId(p.productId),
        quantity: p.quantity,
        price: p.price
      })),
      total: data.products.reduce((acc, p) => acc + p.price * p.quantity, 0),
      paymentType: data.paymentType
    }).save(),
    'Failed to create sale'
  );
};

/**
 * Retrieves all sales from the database.
 *
 * @returns Array of Sale documents with related product and cashier info
 */
export const listSales = async (): Promise<SaleDocument[]> => {
  return SaleModel.find()
    .populate('cashier', 'name email')
    .populate('products.product', 'name price')
    .sort({ createdAt: -1 })
    .lean<SaleDocument[]>();
};

/**
 * Retrieves a sale by its ID.
 *
 * @param saleId - Sale ID as string
 * @returns Sale document or throws if not found
 */
export const getSaleById = async (saleId: Types.ObjectId): Promise<SaleDocument> => {
  return assertExists(
    await SaleModel.findById(saleId)
      .populate('cashier', 'name email')
      .populate('products.product', 'name price')
      .lean<SaleDocument | null>(),
    'Sale not found'
  );
};
