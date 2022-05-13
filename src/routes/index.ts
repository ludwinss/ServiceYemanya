import { Application, Router } from 'express';

import buildLoginRoute from './login.route';
import productRoute from './product.route';
import productPhotoRoute from './product-photo.route';

function enroutingAPI(app: Application) {
  const root = Router();
  buildLoginRoute(root);
  app.use('/api', productPhotoRoute);
  app.use('/api', productRoute);
  app.use('/api', root);
}

export { enroutingAPI };
