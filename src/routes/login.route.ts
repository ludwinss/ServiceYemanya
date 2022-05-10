import { Router } from 'express';

import controller from '../controllers/login.controller';

const loginRoute = Router();

loginRoute.post('/login/signup', controller.signUp);

export default loginRoute;
