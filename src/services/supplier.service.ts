import { SupplierDocument } from '@/interfaces/supplier.interface';
import { SupplierModel } from '@/models/supplier.model';
import { SupplierCreateInput, SupplierDeletePayload, SupplierEditInput } from '@/types/supplier.types';
import { assertExists, assertFound } from '@/utils/assert.util';

/**
 * Creates a new supplier in the database.
 *
 * @description
 * -> Persists a new supplier using the provided input.
 * -> Returns the created supplier document.
 *
 * @throws
 * -> 500 Internal Server Error if creation fails
 *
 * @param data - Supplier creation input
 * @returns The created supplier document
 */
export const createSupplier = async (data: SupplierCreateInput): Promise<SupplierDocument> => {
  const supplier: SupplierDocument = new SupplierModel(data);
  const saved: SupplierDocument | null = await supplier.save();
  return assertExists(saved, 'Failed to create supplier');
};

/**
 * Retrieves all suppliers from the database.
 *
 * @description
 * -> Fetches all supplier records using lean query.
 * -> Returns the full list of suppliers.
 *
 * @throws
 * -> 500 Internal Server Error if query fails
 *
 * @returns Array of supplier documents
 */
export const listSuppliers = async (): Promise<SupplierDocument[]> => {
  return await SupplierModel.find().lean<SupplierDocument[]>();
};

/**
 * Deletes a supplier by its ID.
 *
 * @description
 * -> Finds and deletes a supplier by ObjectId.
 * -> Returns the deleted document or throws if not found.
 *
 * @throws
 * -> 404 Not Found if supplier doesn't exist
 *
 * @param _id - Supplier ID to delete
 * @returns The deleted supplier document
 */
export const deleteSupplier = async (_id: SupplierDeletePayload['_id']): Promise<SupplierDocument> => {
  const deleted: SupplierDocument | null = await SupplierModel.findByIdAndDelete(_id).lean<SupplierDocument | null>();
  return assertFound(deleted, 'Supplier not found');
};

/**
 * Updates a supplier by its ID.
 *
 * @description
 * -> Finds and updates supplier by ID using update payload.
 * -> Returns the updated supplier document or throws if not found.
 *
 * @throws
 * -> 404 Not Found if supplier doesn't exist
 *
 * @param data - Update payload including _id and fields to update
 * @returns The updated supplier document
 */
export const editSupplier = async (data: SupplierEditInput): Promise<SupplierDocument> => {
  const { _id, ...update } = data;
  const updated: SupplierDocument | null = await SupplierModel.findByIdAndUpdate(_id, update, {
    new: true
  }).lean<SupplierDocument | null>();
  return assertFound(updated, 'Supplier not found');
};
