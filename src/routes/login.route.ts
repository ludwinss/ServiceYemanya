import { Router } from 'express';

import LoginController from '../controllers/login/login.controller';
import { handleRequest } from '../middlewares/handleRequest';

const loginRoute = Router();

loginRoute.post('/login/signup', (req, res) => new LoginController().run(req, res));

export default loginRoute;
