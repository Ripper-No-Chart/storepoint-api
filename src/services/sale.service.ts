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

  const total: number = data.products.reduce((acc, p) => acc + p.price * p.quantity, 0);

  const sale: SaleDocument = new SaleModel({
    cashier: cashierId,
    products: data.products.map((p: CreateSaleBody['products'][number]) => ({
      product: new Types.ObjectId(p.productId),
      quantity: p.quantity,
      price: p.price
    })),
    total,
    paymentType: data.paymentType
  });

  return assertExists(await sale.save(), 'Failed to create sale');
};

/**
 * Retrieves all sales from the database.
 *
 * @returns Array of Sale documents with related product and cashier info
 */
export const listSales = async (): Promise<SaleDocument[]> => {
  return await SaleModel.find()
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
  const sale: SaleDocument | null = await SaleModel.findById(saleId)
    .populate('cashier', 'name email')
    .populate('products.product', 'name price')
    .lean<SaleDocument | null>();

  return assertExists(sale, 'Sale not found');
};
