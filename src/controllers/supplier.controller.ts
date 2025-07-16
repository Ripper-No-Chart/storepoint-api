import { FastifyReply, FastifyRequest } from 'fastify';
import { SupplierDocument } from '@/interfaces/supplier.interface';
import { supplierCreateSchema, supplierDeleteSchema, supplierEditSchema } from '@/schemas/supplier.schema';
import * as supplierService from '@/services/supplier.service';
import { SupplierCreateInput, SupplierDeletePayload, SupplierEditInput } from '@/types/supplier.types';
import { sendSuccess } from '@/utils/response.util';

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
  const suppliers: SupplierDocument[] = await supplierService.listSuppliers();
  sendSuccess(reply, suppliers);
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
  const data: SupplierCreateInput = supplierCreateSchema.parse(request.body);
  const supplier: SupplierDocument = await supplierService.createSupplier(data);
  sendSuccess(reply, supplier, 'Supplier created');
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
  const deleted: SupplierDocument = await supplierService.deleteSupplier(_id);
  sendSuccess(reply, deleted, 'Supplier deleted');
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
  const data: SupplierEditInput = supplierEditSchema.parse(request.body);
  const updated: SupplierDocument = await supplierService.editSupplier(data);
  sendSuccess(reply, updated, 'Supplier updated');
};
