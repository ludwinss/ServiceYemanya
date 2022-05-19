import { Application, Router } from 'express';

import buildLoginRoute from './login.route';
import { buildProductPhotoRoute, buildProductRoute } from './product.route';

function enroutingAPI(app: Application) {
  const root = Router();
  buildLoginRoute(root);
  buildProductRoute(root);
  buildProductPhotoRoute(root);

  app.use('/api', root);
}

export { enroutingAPI };
