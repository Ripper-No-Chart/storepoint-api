import { supplierCreateSchema, supplierDeleteSchema, supplierEditSchema } from '@/schemas/supplier.schema';
import * as supplierService from '@/services/supplier.service';
import { SupplierCreateInput, SupplierDeletePayload } from '@/types/supplier.types';
import { sendSuccess } from '@/utils/response.util';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Lists all suppliers.
 *
 * @route POST /api/suppliers/list_suppliers
 * @access manager, admin
 *
 * @description
 * -> Used in product sourcing and orders.
 *
 * @fields
 * // none
 */
export const listSuppliers = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  sendSuccess(reply, await supplierService.listSuppliers());
};

/**
 * Registers a new supplier.
 *
 * @route POST /api/suppliers/create_supplier
 * @access manager, admin
 *
 * @description
 * -> Needs name and contact info.
 *
 * @fields
 * -> name – Supplier name
 * -> contact – Email or phone
 */

export const createSupplier = async (
  request: FastifyRequest<{ Body: SupplierCreateInput }>,
  reply: FastifyReply
): Promise<void> => {
  sendSuccess(
    reply,
    await supplierService.createSupplier(supplierCreateSchema.parse(request.body)),
    'Supplier created'
  );
};

/**
 * Deletes a supplier by ID.
 *
 * @route POST /api/suppliers/delete_supplier
 * @access manager, admin
 *
 * @description
 * -> Only if not associated to pending purchases.
 *
 * @fields
 * -> id – Supplier ID
 */

export const deleteSupplier = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { _id }: SupplierDeletePayload = supplierDeleteSchema.parse(request.body);
  sendSuccess(reply, await supplierService.deleteSupplier(_id), 'Supplier deleted');
};

/**
 * Edits supplier details.
 *
 * @route POST /api/suppliers/edit_supplier
 * @access manager, admin
 *
 * @description
 * -> Name and contact info are editable.
 *
 * @fields
 * -> id – Supplier ID
 * -> name – New name
 * -> contact – New contact
 */

export const editSupplier = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  sendSuccess(reply, await supplierService.editSupplier(supplierEditSchema.parse(request.body)), 'Supplier updated');
};
