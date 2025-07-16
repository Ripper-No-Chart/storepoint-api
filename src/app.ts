import { buildApp } from '@/index';
import chalk from 'chalk';
import { config } from 'dotenv';
import Fastify, { FastifyInstance } from 'fastify';
import mongoose from 'mongoose';

config();

const PORT: number = Number(process.env.PORT) || 3000;
const MONGO_URI: string = process.env.MONGO_URI || '';

/**
 * Application entry point.
 *
 * @description
 * -> Loads environment variables from `.env` file.
 * -> Connects to MongoDB using the provided URI.
 * -> Creates and configures Fastify instance using `buildApp`.
 * -> Starts the HTTP server on the specified port.
 * -> Handles any initialization error gracefully and terminates the process if needed.
 *
 * @returns Void
 */
const start = async (): Promise<void> => {
  try {
    const app: FastifyInstance = Fastify({
      logger: {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            singleLine: true
          }
        }
      }
    });

    await mongoose.connect(MONGO_URI);
    console.info(chalk.cyan('✅ Connected to MongoDB'));

    await buildApp(app, {});
    console.info(chalk.cyan('✅ App built'));

    await app.listen({ port: PORT });
  } catch (error) {
    console.error(chalk.red('❌ Failed to start server:'), (error as Error).message);
    process.exit(1);
  }
};

start()
  .then(() => {
    console.info('Start finished successfully!');
  })
  .catch((error) => {
    console.error('Error occurred while starting:', error);
  });
