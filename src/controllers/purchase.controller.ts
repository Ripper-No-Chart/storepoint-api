import { PurchaseDocument } from '@/interfaces/purchase.interface';
import { purchaseCreateSchema, purchaseDeleteSchema, purchaseEditSchema } from '@/schemas/purchase.schema';
import * as purchaseService from '@/services/purchase.service';
import { PurchaseCreateInput, PurchaseDeletePayload, PurchaseEditInput } from '@/types/purchase.types';
import { sendSuccess } from '@/utils/response.util';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Lists all purchases.
 *
 * @route POST /api/purchases/list_purchases
 * @access manager, admin
 *
 * @description
 * -> Includes supplier and product info.
 *
 * @fields
 * // none
 */
export const listPurchases = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const purchases: PurchaseDocument[] = await purchaseService.listPurchases();
  sendSuccess(reply, purchases);
};

/**
 * Creates a new purchase record.
 *
 * @route POST /api/purchases/create_purchase
 * @access manager, admin
 *
 * @description
 * -> Requires supplier and item list.
 *
 * @fields
 * -> supplierId – Supplier
 * -> items      – Products with quantity
 */
export const createPurchase = async (
  request: FastifyRequest<{ Body: PurchaseCreateInput }>,
  reply: FastifyReply
): Promise<void> => {
  const data: PurchaseCreateInput = purchaseCreateSchema.parse(request.body);
  const purchase: PurchaseDocument = await purchaseService.createPurchase(data);
  sendSuccess(reply, purchase, 'Purchase created');
};

/**
 * Deletes a purchase record.
 *
 * @route POST /api/purchases/delete_purchase
 * @access manager, admin
 *
 * @description
 * -> Only if not received.
 *
 * @fields
 * -> id – Purchase ID
 */
export const deletePurchase = async (
  request: FastifyRequest<{ Body: PurchaseDeletePayload }>,
  reply: FastifyReply
): Promise<void> => {
  const { _id }: PurchaseDeletePayload = purchaseDeleteSchema.parse(request.body);
  const deleted: PurchaseDocument = await purchaseService.deletePurchase(_id);
  sendSuccess(reply, deleted, 'Purchase deleted');
};

/**
 * Edits purchase details.
 *
 * @route POST /api/purchases/edit_purchase
 * @access manager, admin
 *
 * @description
 * -> Can update supplier or items.
 *
 * @fields
 * -> id         – Purchase ID
 * -> items      – New list
 * -> supplierId – New supplier
 */
export const editPurchase = async (
  request: FastifyRequest<{ Body: PurchaseEditInput }>,
  reply: FastifyReply
): Promise<void> => {
  const data: PurchaseEditInput = purchaseEditSchema.parse(request.body);
  const updated: PurchaseDocument = await purchaseService.editPurchase(data);
  sendSuccess(reply, updated, 'Purchase updated');
};
