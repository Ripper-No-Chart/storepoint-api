import { Operation } from '@/constants/roles.constants';
import { UserRole } from '@/constants/user.constants';

/**
 * Role-based permission mapping.
 *
 * @description
 * -> Maps operations that each role is allowed to perform.
 * -> Used by `permit()` middleware for enforcing granular access.
 * -> ADMIN implicitly has access to all operations.
 */
export const RolePermissions: Record<UserRole, Operation[]> = {
  [UserRole.ADMIN]: Object.values(Operation),

  [UserRole.MANAGER]: [
    // Sales & Payments
    Operation.CREATE_SALE,
    Operation.CREATE_RETURN,
    Operation.CREATE_PAYMENT,
    Operation.LIST_SALES,
    Operation.LIST_PAYMENT,
    Operation.LIST_RETURN,

    // Products
    Operation.LIST_PRODUCT,

    // Categories
    Operation.LIST_CATEGORY,

    // Purchases
    Operation.LIST_PURCHASE,

    // Suppliers
    Operation.LIST_SUPPLIER,

    // Reports
    Operation.GENERATE_REPORT,
    Operation.VIEW_INVENTORY
  ],

  [UserRole.CASHIER]: [
    Operation.CREATE_SALE,
    Operation.CREATE_PAYMENT,
    Operation.CREATE_RETURN,
    Operation.LIST_SALES,
    Operation.LIST_PAYMENT,
    Operation.LIST_RETURN
  ],

  [UserRole.STOCKIST]: [
    Operation.CREATE_PURCHASE,
    Operation.LIST_PURCHASE,
    Operation.LIST_PRODUCT,
    Operation.LIST_SUPPLIER,
    Operation.LIST_CATEGORY,
    Operation.VIEW_INVENTORY
  ],

  [UserRole.VIEWER]: [
    Operation.LIST_PRODUCT,
    Operation.LIST_SUPPLIER,
    Operation.LIST_CATEGORY,
    Operation.LIST_PURCHASE,
    Operation.VIEW_INVENTORY
  ],

  [UserRole.SUPPORT]: [Operation.CREATE_RETURN, Operation.LIST_RETURN]
};
