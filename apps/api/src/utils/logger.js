import pino from 'pino';
import { LOGGER_LEVEL } from '../conf';

export const logger = pino({ level: LOGGER_LEVEL });
