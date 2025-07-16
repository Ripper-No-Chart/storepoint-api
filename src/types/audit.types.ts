import { auditLogSchema } from '@/schemas/audit.schema';
import { Types } from 'mongoose';
import z from 'zod';

/**
 * Audit log Mongoose document type.
 *
 * @description
 * -> Represents the internal MongoDB document with ObjectId and schema shape.
 * -> Used only for internal logic, separate from DTO or interface.
 *
 * @property endpoint - Path of the accessed endpoint (e.g. /api/sales/createSale)
 * @property method - HTTP method used (e.g. POST)
 * @property userId - MongoDB ObjectId of the user
 * @property userName - Full name of the user
 * @property createdAt - Timestamp of log creation
 * @property payload - Raw request body or input payload (optional)
 */

export type AuditLogDocument = {
  endpoint: string;
  method: string;
  userId: Types.ObjectId;
  userName: string;
  createdAt: Date;
  payload?: unknown;
};

/**
 * Inferred TypeScript type from `auditLogSchema`.
 *
 * @description
 * -> Ensures type safety when working with validated audit log objects.
 */
export type AuditLogSchema = z.infer<typeof auditLogSchema>;
