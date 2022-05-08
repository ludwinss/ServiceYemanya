import { Application } from 'express';

import productRoute from './product.route';
import productPhotoRoute from './product-photo.route';

function enroutingAPI(app: Application) {
  app.use('/api', productPhotoRoute);
  app.use('/api', productRoute);
}

export { enroutingAPI };
