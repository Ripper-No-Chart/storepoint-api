import { HTTP_STATUS } from '@/constants/http.constants';
import { createError } from '@/utils/error.util';

/**
 * Ensures a value exists (not null or undefined), otherwise throws a 500 error.
 *
 * @param entity - The value to assert
 * @param message - Error message if the value is missing
 * @returns The asserted value (typed)
 *
 * @throws 500 Internal Server Error if value is null or undefined
 */
export const assertExists = <T>(entity: T | null | undefined, message: string): T => {
  if (!entity) {
    throw createError(HTTP_STATUS.INTERNAL_SERVER_ERROR, message);
  }

  return entity;
};

/**
 * Ensures an entity was found, otherwise throws a 404 Not Found error.
 *
 * @description
 * -> Used to validate that a resource exists in the database.
 * -> Throws a 404 if the value is null or undefined.
 *
 * @param entity - The entity to assert (can be null or undefined)
 * @param message - The error message to throw if not found
 * @returns The asserted entity with correct type
 *
 * @throws
 * -> 404 Not Found if the entity is missing
 */
export const assertFound = <T>(entity: T | null | undefined, message: string): T => {
  if (!entity) {
    throw createError(HTTP_STATUS.NOT_FOUND, message);
  }
  return entity;
};
