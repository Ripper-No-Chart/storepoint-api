import type { PackageJson } from 'type-fest';

/**
 * Shape of the `package.json` content limited to `version` field.
 *
 * @description
 * -> Represents the structure of `package.json`, focused on the `version` field.
 * -> Used to safely parse and type-check app version retrieval.
 */
export interface IPackageJsonVersionOnly extends Pick<PackageJson, 'version'> {
  version: string;
}

/**
 * Health payload response object.
 *
 * @description
 * -> Returned by `/api/health` endpoint.
 * -> Encapsulates system metrics and DB connectivity status.
 *
 * @property statusCode - HTTP status code of the response
 * @property payload - Detailed health report
 */
export interface IHealthReport {
  statusCode: number;
  payload: {
    /** "ok" if system and DB are running; "error" otherwise */
    status: 'ok' | 'error';

    /** Server uptime in HH:MM:SS format */
    uptime: string;

    /** Machine hostname running the backend */
    hostname: string;

    /** Memory usage breakdown (in MB) */
    memory: Record<string, string>;

    /** Server timestamp at response time, formatted as DD/MM/YYYY - HH:MM */
    timestamp: string;

    /** MongoDB connection info */
    mongo: {
      connected: boolean;
      state: number;
    };

    /** Project version from package.json */
    version: string;
  };
}
