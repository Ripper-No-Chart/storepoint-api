import { z } from 'zod';

import { supplierCreateSchema, supplierDeleteSchema, supplierEditSchema } from '@/schemas/supplier.schema';

/**
 * Payload for creating a supplier.
 *
 * @description
 * -> Uses Zod schema to infer the supplier creation payload structure.
 * -> Ensures valid data for creating a supplier (name, email, phone, address).
 */
export type SupplierCreateInput = z.infer<typeof supplierCreateSchema>;

/**
 * Payload for deleting a supplier by ID.
 *
 * @description
 * -> Uses Zod schema to infer the supplier deletion payload structure.
 * -> Ensures the validity of the supplier ID to be deleted.
 */
export type SupplierDeletePayload = z.infer<typeof supplierDeleteSchema>;

/**
 * Payload for editing supplier details.
 *
 * @description
 * -> Uses Zod schema to infer the supplier update payload structure.
 * -> Ensures valid data for updating a supplier (name, email, phone, address).
 */
export type SupplierEditInput = z.infer<typeof supplierEditSchema>;
