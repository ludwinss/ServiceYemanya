import { Router } from 'express';

import BuildLogin from '../controllers/login';
import hasPermission from '../middlewares/hasPermission';

function buildLoginRoute(route: Router) {
  route.post('/login/signup', (req, res) => new BuildLogin(req, res).madeSignUp());
  route.post('/login/signup/admin', hasPermission, (req, res) => new BuildLogin(req, res).madeSignUp());
  route.post('/login/signin', (req, res) => new BuildLogin(req, res).madeSignIn());
}

export default buildLoginRoute;
