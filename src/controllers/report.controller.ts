import { reportInventoryLowStockSchema, reportPaymentsSchema, reportSalesSchema } from '@/schemas/report.schema';
import * as reportService from '@/services/report.service';
import { ReportInventoryLowStockInput, ReportPaymentsInput, ReportSalesInput } from '@/types/report.types';
import { sendSuccess } from '@/utils/response.util';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Generates a report of sales within a given range.
 *
 * @route POST /api/reports/sales
 * @access manager, admin
 *
 * @description
 * -> Returns total amount, count, and breakdown by method.
 *
 * @fields
 * -> startDate  – Start of the reporting range
 * -> endDate    – End of the reporting range
 */
export const reportSales = async (
  request: FastifyRequest<{ Body: ReportSalesInput }>,
  reply: FastifyReply
): Promise<void> => {
  sendSuccess(reply, await reportService.generateSalesReport(reportSalesSchema.parse(request.body)));
};

/**
 * Lists products with inventory below threshold.
 *
 * @route POST /api/reports/report_inventory_low_stock
 * @access manager, admin
 *
 * @description
 * -> Helps identify items to restock.
 *
 * @fields
 * -> threshold  – Minimum stock quantity to trigger alert (optional)
 */
export const reportInventoryLowStock = async (
  request: FastifyRequest<{ Body: ReportInventoryLowStockInput }>,
  reply: FastifyReply
): Promise<void> => {
  sendSuccess(reply, await reportService.generateLowStockReport(reportInventoryLowStockSchema.parse(request.body)));
};

/**
 * Generates a payments summary report.
 *
 * @route POST /api/reports/report_payments
 * @access manager, admin
 *
 * @description
 * -> Grouped by method and date range.
 *
 * @fields
 * -> startDate  – Start of range
 * -> endDate    – End of range
 */
export const reportPayments = async (
  request: FastifyRequest<{ Body: ReportPaymentsInput }>,
  reply: FastifyReply
): Promise<void> => {
  sendSuccess(reply, await reportService.generatePaymentsReport(reportPaymentsSchema.parse(request.body)));
};
