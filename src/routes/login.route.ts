import { Router } from 'express';

import BuildLogin from '../controllers/login';

function buildLoginRoute(route: Router) {
  route.post('/login/signup', (req, res) => new BuildLogin(req, res).madeSignUp());
  route.post('/login/signup/admin', (req, res) => new BuildLogin(req, res).madeSignUp());
  route.post('/login/signin', (req, res) => new BuildLogin(req, res).madeSignIn());
}

export default buildLoginRoute;
