import {
  InventoryLowStockResponse,
  LowStockItem,
  PaymentsReportResponse,
  PaymentSummary,
  SalesReportResponse,
  TimeSeriesPoint
} from '@/interfaces/report.interface';
import { ProductModel } from '@/models/product.model';
import { SaleModel } from '@/models/sale.model';
import { ProductLean } from '@/types/product.types';
import { ReportInventoryLowStockInput, ReportPaymentsInput, ReportSalesInput } from '@/types/report.types';
import { assertFound } from '@/utils/assert.util';

/**
 * Generates a sales report grouped by time.
 */
export const generateSalesReport = async (input: ReportSalesInput): Promise<SalesReportResponse> => {
  const { from, to, groupBy } = input;

  const results: TimeSeriesPoint[] = await SaleModel.aggregate<TimeSeriesPoint>([
    {
      $match: {
        createdAt: {
          $gte: new Date(from),
          $lte: new Date(to)
        }
      }
    },
    {
      $group: {
        _id: {
          $dateTrunc: {
            date: '$createdAt',
            unit: groupBy
          }
        },
        total: { $sum: '$total' },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        date: { $dateToString: { format: '%d-%m-%Y', date: '$_id' } },
        total: 1,
        count: 1
      }
    },
    {
      $sort: { date: 1 }
    }
  ]);

  return { series: results };
};

/**
 * Generates a low stock inventory report.
 */
export const generateLowStockReport = async (
  input: ReportInventoryLowStockInput
): Promise<InventoryLowStockResponse> => {
  const { threshold } = input;

  const products: ProductLean[] = await ProductModel.find(
    { stock: { $lte: threshold } },
    { _id: 1, name: 1, stock: 1 }
  ).lean<ProductLean[]>();

  const items: LowStockItem[] = products.map((p) => ({
    productId: p._id,
    name: p.name,
    stock: p.stock
  }));

  return {
    items,
    total: items.length
  };
};

/**
 * Generates a payments report filtered by payment method.
 */
export const generatePaymentsReport = async (input: ReportPaymentsInput): Promise<PaymentsReportResponse> => {
  const { method } = input;

  const summary: PaymentSummary[] = await SaleModel.aggregate<PaymentSummary>([
    { $match: { paymentType: method } },
    {
      $group: {
        _id: '$paymentType',
        total: { $sum: '$total' },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        method: '$_id',
        total: 1,
        count: 1
      }
    }
  ]);

  const total: number = summary.length ? summary[0].total : 0;

  return {
    summary: assertFound(summary, 'No payment data found'),
    total
  };
};
