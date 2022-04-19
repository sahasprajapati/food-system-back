import { env } from '../utils/env';

export const authConfig = {
  jwtSecret: env('JWT_SECRET'),
  jwtExpiresIn: env('JWT_EXPIRES_IN'),
};
