import { Types } from 'mongoose';
import { z } from 'zod';

/**
 * Zod validator for MongoDB ObjectId.
 *
 * @description
 * -> Validates that a string is a valid MongoDB ObjectId.
 * -> Transforms the value to a `Types.ObjectId` instance.
 */
export const zObjectId: () => z.ZodEffects<z.ZodString, Types.ObjectId, string> = () =>
  z.string().transform((val, ctx) => {
    if (!Types.ObjectId.isValid(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid ObjectId'
      });
      return z.NEVER;
    }
    return new Types.ObjectId(val);
  });
