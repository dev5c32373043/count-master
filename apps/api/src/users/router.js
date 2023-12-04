import { Router } from 'express';

import getProfile from './routes/get-profile';

const usersRouter = Router();

usersRouter.get('/me', getProfile);

export default usersRouter;
