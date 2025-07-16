import { z } from 'zod';

import { purchaseCreateSchema, purchaseDeleteSchema, purchaseEditSchema } from '@/schemas/purchase.schema';

/**
 * Payload for creating a purchase.
 *
 * @description
 * -> Represents the input data required to create a purchase.
 * -> Includes productId, quantity, and purchaseDate to define the details of the purchase.
 */
export type PurchaseCreateInput = z.infer<typeof purchaseCreateSchema>;

/**
 * Payload for deleting a purchase by ID.
 *
 * @description
 * -> Represents the payload required to delete a purchase by its unique ObjectId.
 * -> Only requires the _id of the purchase to delete it.
 */
export type PurchaseDeletePayload = z.infer<typeof purchaseDeleteSchema>;

/**
 * Payload for editing purchase details.
 *
 * @description
 * -> Defines the structure for editing an existing purchase's details.
 * -> Allows optional fields such as productId and quantity for updating purchase information.
 */
export type PurchaseEditInput = z.infer<typeof purchaseEditSchema>;
