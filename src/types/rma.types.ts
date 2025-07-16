import { z } from 'zod';
import { rmaCreateSchema, rmaListSchema } from '@/schemas/rma.schema';

/**
 * Payload for creating a return/RMA.
 *
 * @description
 * -> Uses Zod schema to infer the RMA creation input structure.
 */
export type CreateRMABody = z.infer<typeof rmaCreateSchema>;

/**
 * Payload for listing RMAs of a sale.
 *
 * @description
 * -> Uses Zod schema to infer the input for listing RMAs by saleId.
 */
export type ListRMAsBySaleBody = z.infer<typeof rmaListSchema>;
