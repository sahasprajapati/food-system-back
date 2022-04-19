import { env } from '../utils/env';

export const dbConfig = {
  dbType: env('DB_TYPE'),
  dbHost: env('DB_HOST'),
  dbPort: env('DB_PORT'),
  dbDatabase: env('DB_DATABASE'),
  dbUsername: env('DB_USERNAME'),
  dbPassword: env('DB_PASSWORD'),
  dbEntities: env('DB_ENTITIES'),
  dbMigrations: env('DB_MIGRATIONS'),
  allowLogging: env('DB_LOGGING'),
  allowSynchronization: env('DB_SYNCHRONIZE'),
};
