import { ProductDocument } from '@/interfaces/product.interface';
import { ProductModel } from '@/models/product.model';
import { SaleProductInput } from '@/types/sale.types';

/**
 * Adjusts stock of products based on a sale transaction.
 *
 * @description
 * -> For each product sold, subtracts quantity from current stock.
 * -> Fails if any product has insufficient stock.
 *
 * @param soldItems - Array of sold product data
 * @throws Error if stock is insufficient
 */
export const adjustStockOnSale = async (soldItems: SaleProductInput[]): Promise<void> => {
  for (const item of soldItems) {
    const product: ProductDocument | null = await ProductModel.findById(item.productId).lean<ProductDocument | null>();

    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product: ${product.name}`);
    }

    product.stock -= item.quantity;
    await product.save();
  }
};
