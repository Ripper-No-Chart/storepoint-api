/**
 * Audit log entry schema.
 *
 * @description
 * -> Represents a single user interaction with a public API endpoint.
 * -> Used to store metadata of API usage for audit purposes.
 *
 * @property endpoint - Path of the accessed endpoint (e.g. /api/sales/createSale)
 * @property method - HTTP method used (e.g. POST)
 * @property userId - MongoDB ObjectId reference to the user
 * @property userName - Full name of the user who triggered the action
 * @property createdAt - Timestamp of when the action occurred
 * @property payload - Raw request body, if any, sent by the user
 */
export interface AuditLog {
  endpoint: string;
  method: string;
  userId: string;
  userName: string;
  createdAt: Date;
  payload?: unknown;
}
