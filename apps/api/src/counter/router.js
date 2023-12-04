import { Router } from 'express';

import * as routes from './routes';

import { AccessGuard } from '@/middleware';

const counterRouter = Router();

counterRouter.get('/current', AccessGuard('counter:read'), routes.getCurrent);
counterRouter.get('/history', AccessGuard('counter:history'), routes.getHistory);
counterRouter.put('/increment', AccessGuard('counter:incr'), routes.increment);
counterRouter.put('/decrement', AccessGuard('counter:decr'), routes.decrement);

export default counterRouter;
