import { PurchaseDocument } from '@/interfaces/purchase.interface';
import { PurchaseModel } from '@/models/purchase.model';
import { PurchaseCreateInput, PurchaseDeletePayload, PurchaseEditInput } from '@/types/purchase.types';
import { assertExists, assertFound } from '@/utils/assert.util';

/**
 * Creates a new purchase in the database.
 *
 * @description
 * -> Persists a new purchase using the provided payload.
 * -> Returns the created purchase document.
 *
 * @param data - Purchase creation input
 * @returns Created purchase document
 */
export const createPurchase = async (data: PurchaseCreateInput): Promise<PurchaseDocument> => {
  return assertExists(await new PurchaseModel(data).save(), 'Failed to create purchase');
};

/**
 * Retrieves all purchases from the database.
 *
 * @description
 * -> Fetches all purchase records.
 *
 * @returns Array of purchase documents
 */
export const listPurchases = async (): Promise<PurchaseDocument[]> => {
  return PurchaseModel.find().lean<PurchaseDocument[]>();
};

/**
 * Deletes a purchase by its ID.
 *
 * @description
 * -> Removes a purchase by its ObjectId.
 * -> Throws 404 if not found.
 *
 * @param _id - MongoDB ObjectId of the purchase
 * @returns Deleted purchase document
 */
export const deletePurchase = async (_id: PurchaseDeletePayload['_id']): Promise<PurchaseDocument> => {
  return assertFound(await PurchaseModel.findByIdAndDelete(_id).lean<PurchaseDocument | null>(), 'Purchase not found');
};

/**
 * Updates a purchase by its ID.
 *
 * @description
 * -> Applies updates to a purchase using provided data.
 * -> Throws 404 if the purchase is not found.
 *
 * @param data - Update payload
 * @returns Updated purchase document
 */
export const editPurchase = async (data: PurchaseEditInput): Promise<PurchaseDocument> => {
  const { _id, ...update } = data;
  return assertFound(
    await PurchaseModel.findByIdAndUpdate(_id, update, {
      new: true
    }).lean<PurchaseDocument | null>(),
    'Purchase not found'
  );
};
