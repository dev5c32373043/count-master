import express from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import cors from 'cors';

import 'dotenv/config';
import { PORT } from './conf';
import { logger } from './utils';

const app = express();

app.use(express.json({ limit: '1mb' }));

app.use(pinoHttp({ logger }));

app.use(cors('*'));

app.use(helmet());

import passport from 'passport';
import JwtStrategy from './auth/strategies/jwt';

passport.use(JwtStrategy());
app.use(passport.initialize());

import authRouter from './auth/router';
import usersRouter from './users/router';
import counterRouter from './counter/router';

// could be useful for health check
app.get('/api', (req, res) => res.sendStatus(200));

app.use('/api/auth', authRouter);

app.use(passport.authenticate('jwt', { session: false }));

app.use('/api/users', usersRouter);
app.use('/api/counter', counterRouter);

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server is live on http://localhost:${PORT}`);
});

import setupWS from './sockets';

setupWS(server);

server.on('error', logger.error);
