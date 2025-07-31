/**
 * Enum of system roles.
 *
 * @description
 * -> Central role authority for authorization.
 * -> Defines various roles such as "admin", "manager", "cashier", and others.
 * @usage
 * -> Backend & Frontend-safe via type & enum duality.
 */

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  CASHIER = 'cashier',
  STOCKIST = 'stockist',
  VIEWER = 'viewer',
  SUPPORT = 'support'
}

/**
 * List of all user roles as strings.
 *
 * @description
 * -> Provides an array of all available roles.
 * -> Used for validation and user role assignment.
 */
export const USER_ROLES: readonly string[] = Object.values(UserRole) as readonly string[];
