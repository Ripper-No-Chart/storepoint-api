import bcrypt from 'bcrypt';

/**
 * Hashes a plain-text password using bcrypt.
 *
 * @description
 * -> Takes a raw password and returns its hashed version.
 * -> Uses bcrypt hashing with a salt round of 10 for security.
 *
 * @param plainPassword - The raw password string to hash
 * @returns A hashed password string
 */
export const hashPassword = async (plainPassword: string): Promise<string> => {
  const saltRounds: number = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

/**
 * Compares a plain-text password with a hashed password.
 *
 * @description
 * -> Compares the input password with the stored hashed password.
 * -> Returns true if they match, otherwise false.
 *
 * @param plainPassword - Raw password input
 * @param hashedPassword - Stored hashed password
 * @returns Whether the passwords match
 */
export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Validates password format according to minimum requirements.
 *
 * @description
 * -> Checks if the password meets the following criteria:
 *    - At least 6 characters long.
 *    - Contains at least one uppercase letter.
 *    - Contains at least one lowercase letter.
 *    - Contains at least one digit.
 *    - Contains at least one special character (e.g., @, #, $, %, etc.).
 *
 * @param value - Password string to validate
 * @returns Whether password meets criteria
 */
export const validatePassword = (value: string): boolean => {
  // Regex for validating password
  const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  return regex.test(value);
};
