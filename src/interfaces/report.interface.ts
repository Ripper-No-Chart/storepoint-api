import { PaymentType } from '@/constants/payment.constants';
import { Types } from 'mongoose';

/**
 * Enum of valid time groupings for sales report.
 *
 * @description
 * -> Represents time aggregation levels supported in reports.
 */
export type GroupBy = 'day' | 'week' | 'month';

/**
 * Type for a generic time series data point.
 *
 * @description
 * -> Represents a point in time with a total and optional count.
 *
 * @fields
 * -> date: string
 * -> total: number
 * -> count?: number
 */
export interface TimeSeriesPoint {
  date: string;
  total: number;
  count?: number;
}

/**
 * Type for low stock product entry.
 *
 * @description
 * -> Represents a product with current stock lower than threshold.
 *
 * @fields
 * -> productId: string
 * -> name: string
 * -> stock: number
 */
export interface LowStockItem {
  productId: Types.ObjectId;
  name: string;
  stock: number;
}

/**
 * Type for total payments per method.
 *
 * @description
 * -> Represents aggregated payments by method.
 *
 * @fields
 * -> method: PaymentType
 * -> total: number
 * -> count: number
 */
export interface PaymentSummary {
  method: PaymentType;
  total: number;
  count: number;
}

/**
 * Response format for the sales report.
 *
 * @description
 * -> Contains aggregated sales data grouped by time.
 *
 * @fields
 * -> series: TimeSeriesPoint[]
 */
export interface SalesReportResponse {
  series: TimeSeriesPoint[];
}

/**
 * Response format for the inventory low stock report.
 *
 * @description
 * -> List of items under the defined threshold.
 *
 * @fields
 * -> items: LowStockItem[]
 * -> total: number
 */
export interface InventoryLowStockResponse {
  items: LowStockItem[];
  total: number;
}

/**
 * Response format for the payments report.
 *
 * @description
 * -> Aggregated data of payments grouped by method.
 *
 * @fields
 * -> summary: PaymentSummary[]
 * -> total: number
 */
export interface PaymentsReportResponse {
  summary: PaymentSummary[];
  total: number;
}
