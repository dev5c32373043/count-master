import { Router } from 'express';

import login from './routes/login';
import signUp from './routes/signup';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/signup', signUp);

export default authRouter;
