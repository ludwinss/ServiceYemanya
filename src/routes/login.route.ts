import { Router } from 'express';

import BuildLogin from '../controllers/login';

const loginRoute = Router();

loginRoute.post('/login/signup', (req, res) => new BuildLogin(req, res).madeSignUp());
loginRoute.post('/login/signin', (req, res) => new BuildLogin(req, res).madeSignIn());

export default loginRoute;
