/**
 * HTTP status codes used throughout the application.
 *
 * @description
 * -> Represents a set of standard HTTP status codes used for responses.
 * -> Includes common codes like 200 (OK), 201 (Created), 400 (Bad Request), and 500 (Internal Server Error).
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
} satisfies Record<string, number>;

/**
 * Type representing valid HTTP status code values.
 *
 * @description
 * -> Defines the type that can hold any of the values from the `HTTP_STATUS` object.
 * -> Ensures that only valid HTTP status codes are used throughout the application.
 */
export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
