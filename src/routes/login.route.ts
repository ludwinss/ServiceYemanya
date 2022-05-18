import { Router } from 'express';

import BuildLogin from '../controllers/login';
import { isAdmin } from '../middlewares/hasPermission';

function buildLoginRoute(route: Router) {
  route.post('/login/signup', (req, res) => new BuildLogin(req, res).madeSignUp());
  route.post('/login/signup/admin', isAdmin, (req, res) => new BuildLogin(req, res).madeSignUpAdmin());
  route.post('/login/signin', (req, res) => new BuildLogin(req, res).madeSignIn());
}

export default buildLoginRoute;
