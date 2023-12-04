export const LOGGER_LEVEL = process.env.LOGGER_LEVEL ?? 'info';
export const PORT = process.env.PORT || 3000;
export const COUNTER_QUEUE_NAME = process.env.COUNTER_QUEUE_NAME ?? 'counter';
export const REDIS_HOST = process.env.REDIS_HOST ?? 'localhost';
export const REDIS_PORT = process.env.REDIS_PORT || 6379;
export const JWT_SECRET = process.env.JWT_SECRET || 'youllneverguess';
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 9;
