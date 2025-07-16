import { PaymentType } from '@/constants/payment.constants';

/**
 * Enum representing valid statuses a purchase can have.
 */
export enum PurchaseStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

/**
 * Type alias for one valid purchase status.
 */
export type PurchaseStatusValue = `${PurchaseStatus}`;

/**
 * Type alias for one valid payment method.
 *
 * @description
 * -> Reuses the global PaymentType enum for consistency.
 */
export type PurchasePaymentMethod = PaymentType;
