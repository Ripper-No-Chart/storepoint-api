/**
 * Custom error factory.
 *
 * @description
 * -> Creates a new error with a specific status code.
 * -> Useful for throwing errors with custom status codes.
 *
 * @param statusCode - HTTP status code
 * @param message - Error message
 * @returns Error instance with statusCode
 */
export const createError = (statusCode: number, message: string): Error => {
  const err: Error & { statusCode?: number } = new Error(message);
  err.statusCode = statusCode;
  return err;
};
