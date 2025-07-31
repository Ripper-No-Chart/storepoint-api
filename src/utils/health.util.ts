import { readFileSync } from 'fs';
import mongoose from 'mongoose';
import os from 'os';
import path from 'path';
import { HTTP_STATUS } from '@/constants/http.constants';
import { IHealthReport, IPackageJsonVersionOnly } from '@/interfaces/health.interface';

/**
 * Formats a given Date object into a readable string in DD/MM/YYYY - HH:MM format.
 *
 * @description
 * -> Uses `toLocaleString` to format the date into a human-readable string.
 * -> Displays the date in the 'es-AR' locale (Argentina).
 *
 * @param date - JavaScript Date instance
 * @returns Formatted date string
 */
const formatTime = (date: Date): string =>
  date
    .toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    .replace(',', ' -');

/**
 * Converts bytes to megabytes with 2 decimal places.
 *
 * @description
 * -> Converts memory from bytes to MB for readability.
 * -> Provides the value with two decimal places.
 *
 * @param bytes - memory in bytes
 * @returns memory in megabytes
 */
const formatMemory = (bytes: number): string => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

/**
 * Reads and returns the current app version from the root package.json file.
 *
 * @description
 * -> Resolves absolute path to `../../package.json` based on current file location.
 * -> Reads the file synchronously and parses it as JSON.
 * -> Extracts and returns the `version` property as a string.
 *
 * @throws Will throw if the file cannot be read or parsed.
 *
 * @returns Project version string from package.json (e.g., "1.0.0")
 */
const getAppVersion = (): string => {
  return (JSON.parse(readFileSync(path.resolve(__dirname, '../../package.json'), 'utf-8')) as IPackageJsonVersionOnly)
    .version!;
};

/**
 * Formats memory usage of the current Node.js process.
 *
 * @description
 * -> Retrieves the process memory usage and formats each value into a readable string.
 *
 * @returns Object with formatted memory usage per category
 */
const getFormattedMemory = (): Record<string, string> =>
  Object.entries(process.memoryUsage()).reduce((acc: Record<string, string>, [key, value]) => {
    acc[key] = formatMemory(value as number);
    return acc;
  }, {});

/**
 * Converts uptime seconds to HH:MM:SS string.
 *
 * @description
 * -> Converts uptime in seconds to a human-readable time format (HH:MM:SS).
 *
 * @param seconds - uptime in seconds
 * @returns Formatted uptime string
 */
const formatUptime = (seconds: number): string => {
  return `${Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0')}:${Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0')}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')}`;
};

/**
 * Gathers system and application health info, including:
 * - DB connection status
 * - Server uptime
 * - Hostname
 * - Memory usage
 * - Formatted timestamp
 *
 * @description
 * -> Combines various health checks, including uptime, memory usage, and DB status.
 * -> Returns a payload with all relevant health information for the system.
 *
 * @returns Full health report payload and response status code
 */
export const getHealthReport = (): IHealthReport => {
  return {
    statusCode: mongoose.connection.readyState === 1 ? HTTP_STATUS.OK : HTTP_STATUS.INTERNAL_SERVER_ERROR,
    payload: {
      status: mongoose.connection.readyState === 1 ? 'ok' : 'error',
      uptime: formatUptime(process.uptime()),
      hostname: os.hostname(),
      memory: getFormattedMemory(),
      timestamp: formatTime(new Date()),
      mongo: {
        connected: mongoose.connection.readyState === 1,
        state: mongoose.connection.readyState
      },
      version: getAppVersion()
    }
  };
};
