import { SaleDocument } from '@/interfaces/sale.interface';
import { SaleModel } from '@/models/sale.model';
import { UserModel } from '@/models/user.model';
import { CreateSaleBody, SaleQueryDto } from '@/types/sale.types';
import { adjustStockOnSale } from '@/utils/adjust-stock.util';
import { assertExists } from '@/utils/assert.util';
import { FilterQuery, Types } from 'mongoose';

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
 * Retrieves filtered and paginated sales.
 *
 * @description
 * -> Applies optional search on cashier name or email.
 * -> Filters by sale date range if 'from' or 'to' are provided.
 * -> Applies pagination and returns result with metadata.
 * -> Throws 404 if no results found.
 *
 * @param dto - SaleQueryDto
 * @returns Object with paginated sale data and metadata
 */
export const listSalesWithFilters = async (
  dto: SaleQueryDto
): Promise<{
  data: SaleDocument[];
  total: number;
  page: number;
  limit: number;
}> => {
  const query: FilterQuery<SaleDocument> = {};

  if (dto.from || dto.to) {
    query.createdAt = {};
    if (dto.from) query.createdAt.$gte = new Date(dto.from);
    if (dto.to) query.createdAt.$lte = new Date(dto.to);
  }

  if (dto.search) {
    query.cashier = {
      $in: (
        await UserModel.find({
          $or: [{ name: { $regex: dto.search, $options: 'i' } }, { email: { $regex: dto.search, $options: 'i' } }]
        }).select('_id')
      ).map((u) => u._id)
    };
  }

  const [data, total] = await Promise.all([
    SaleModel.find(query)
      .skip((dto.page - 1) * dto.limit)
      .limit(dto.limit)
      .populate('cashier', 'name email')
      .populate('products.product', 'name code')
      .lean<SaleDocument[]>(),

    SaleModel.countDocuments(query)
  ]);

  return assertExists({ data, total, page: dto.page, limit: dto.limit }, 'No sales found for the given filters');
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
