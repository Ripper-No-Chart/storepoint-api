/**
 * Enum of system operations.
 *
 * @description
 * -> Defines the granular operations users may be permitted to perform.
 * -> Used with middleware to enforce fine-grained access control.
 */
export enum Operation {
  // ───── Sales & Payments ─────
  CREATE_SALE = 'createSale',
  CREATE_RETURN = 'createReturn',
  CREATE_PAYMENT = 'createPayment',
  LIST_SALES = 'listSales',
  LIST_PAYMENT = 'listPayment',
  LIST_RETURN = 'listReturn',

  // ───── Products ─────
  CREATE_PRODUCT = 'createProduct',
  EDIT_PRODUCT = 'editProduct',
  DELETE_PRODUCT = 'deleteProduct',
  LIST_PRODUCT = 'listProduct',

  // ───── Categories ─────
  CREATE_CATEGORY = 'createCategory',
  EDIT_CATEGORY = 'editCategory',
  DELETE_CATEGORY = 'deleteCategory',
  LIST_CATEGORY = 'listCategory',

  // ───── Purchases ─────
  CREATE_PURCHASE = 'createPurchase',
  LIST_PURCHASE = 'listPurchase',

  // ───── Suppliers ─────
  CREATE_SUPPLIER = 'createSupplier',
  EDIT_SUPPLIER = 'editSupplier',
  DELETE_SUPPLIER = 'deleteSupplier',
  LIST_SUPPLIER = 'listSupplier',

  // ───── Users ─────
  CREATE_USER = 'createUser',
  EDIT_USER = 'editUser',
  DELETE_USER = 'deleteUser',
  LIST_USERS = 'listUsers',

  // ───── Reports & Inventory ─────
  GENERATE_REPORT = 'generateReport',
  VIEW_INVENTORY = 'viewInventory'
}

/**
 * All operation values (as strings).
 *
 * @description
 * -> Used for assigning full access (e.g., admin roles).
 */
export const OPERATIONS: readonly Operation[] = Object.values(Operation) as readonly Operation[];
