import { UserPayload } from '@/interfaces/auth.interface';

/**
 * Runtime type guard to check if an unknown object is a valid UserPayload
 */
export function isUserPayload(obj: unknown): obj is UserPayload {
  return typeof obj === 'object' && obj !== null && '_id' in obj && typeof (obj as { _id: unknown })._id === 'object';
}
