// src/controllers/auth.controller.ts

import { HTTP_STATUS } from '@/constants/http.constants';
import { UserPayload } from '@/interfaces/auth.interface';
import { UserDocument } from '@/interfaces/user.interface';
import { loginSchema, registerSchema } from '@/schemas/auth.schema';
import * as authService from '@/services/auth.service';
import { LoginInput, RegisterInput } from '@/types/auth.types';
import { createError } from '@/utils/error.util';
import { isUserPayload } from '@/utils/guard.util';
import { sendSuccess } from '@/utils/response.util';
import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Handles user login.
 *
 * @route POST /api/auth/login
 * @access Private
 *
 * @description
 * -> Validates login input via Zod.
 * -> Authenticates user and returns token + user data.
 */
export const login = async (request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply): Promise<void> => {
  const data: LoginInput = loginSchema.parse(request.body);
  const { token, user } = await authService.login(data);
  sendSuccess(reply, { token, user }, 'Login successful');
};

/**
 * Registers a new user in the system.
 *
 * @route POST /api/auth/register
 * @access Private
 *
 * @description
 * -> Validates registration input via Zod.
 * -> Registers user and returns the user document.
 */
export const register = async (
  request: FastifyRequest<{ Body: RegisterInput }>,
  reply: FastifyReply
): Promise<void> => {
  const data: RegisterInput = registerSchema.parse(request.body);
  const user: UserDocument = await authService.register(data);
  sendSuccess(reply, user, 'User registered', HTTP_STATUS.CREATED);
};

/**
 * Retrieves the currently authenticated user's details.
 *
 * @route POST /api/auth/me
 * @access Private
 *
 * @description
 * -> Extracts user payload from the request.
 * -> Calls authService.getUserByIdOrFail to validate and fetch the user.
 * -> Returns user document if authenticated and exists.
 *
 * @throws
 * -> 401 Unauthorized if JWT is missing or invalid
 * -> 404 Not Found if user no longer exists
 */
export const getMe = async (
  request: FastifyRequest<{ Headers: Record<string, unknown> }>,
  reply: FastifyReply
): Promise<void> => {
  const rawUser: unknown = request.user;

  const user: UserPayload = isUserPayload(rawUser)
    ? rawUser
    : (() => {
        throw createError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized');
      })();

  const userDoc: UserDocument = await authService.getUserByIdOrFail(user._id);
  sendSuccess(reply, userDoc);
};
