import { AuditLogDocument } from '@/types/audit.types';
import mongoose, { Model, Schema } from 'mongoose';

/**
 * Mongoose schema for audit logs.
 *
 * @description
 * -> Defines the structure for audit log documents stored in MongoDB.
 * -> Used to track user interactions with API endpoints.
 */
const AuditLogSchema = new Schema<AuditLogDocument>({
  endpoint: { type: String, required: true },
  method: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date(), immutable: true },
  payload: { type: Schema.Types.Mixed }
});

/**
 * Mongoose model for audit logs.
 *
 * @description
 * -> Provides access to the AuditLog collection in MongoDB.
 * -> Enables querying and storing audit log entries via Mongoose.
 */
export const AuditLogModel: Model<AuditLogDocument> = mongoose.model<AuditLogDocument>('AuditLog', AuditLogSchema);
