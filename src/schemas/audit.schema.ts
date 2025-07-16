import { z } from 'zod';

/**
 * Zod schema for audit log creation.
 *
 * @description
 * -> Validates structure for creating audit log entries.
 * -> Ensures all fields are correctly formatted and required.
 *
 * @fields
 * -> endpoint: string (required, non-empty)
 * -> method: string (required, non-empty)
 * -> userId: string (required, valid MongoDB ObjectId)
 * -> userName: string (required, non-empty)
 * -> createdAt: Date (required)
 * -> payload: unknown (optional)
 */
export const auditLogSchema = z.object({
  endpoint: z.string({ required_error: 'Endpoint is required' }).min(1, 'Endpoint cannot be empty'),
  method: z.string({ required_error: 'HTTP method is required' }).min(1, 'Method cannot be empty'),
  userId: z.string({ required_error: 'User ID is required' }).regex(/^[a-f\d]{24}$/i, 'Invalid Mongo ObjectId'),
  userName: z.string({ required_error: 'User name is required' }).min(1, 'User name cannot be empty'),
  createdAt: z.date({ required_error: 'Creation date is required' }),
  payload: z.unknown().optional()
});

