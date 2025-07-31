import { buildApp } from '@/index';
import chalk from 'chalk';
import { config } from 'dotenv';
import Fastify from 'fastify';
import mongoose from 'mongoose';

config();

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
    await mongoose.connect(process.env.MONGO_URI ?? '');
    console.info(chalk.cyan('✅ Connected to MongoDB'));

    await buildApp(
      Fastify({
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
      }),
      {}
    );
    console.info(chalk.cyan('✅ App built'));

    await Fastify({
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
    }).listen({ port: Number(process.env.PORT) || 3000 });
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
