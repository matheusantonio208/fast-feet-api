import { Router } from 'express';
import multer from 'multer';

import multerConfig from '../../config/multer';

import FileController from './file_controller/file_controller';
import SessionController from './session_controller/session_controller';
import RecipientController from './recipient_controller/recipient_controller';

import authService from '../services/auth-service';

class Routes {
  constructor() {
    this.routes = new Router();
    this.upload = multer(multerConfig);

    this.session('/session');
    this.recipient('/recipient');
  }

  session(baseRote) {
    this.routes.post(`${baseRote}`, SessionController.store);
  }

  recipient(baseRoute) {
    this.routes.get(`${baseRoute}`, RecipientController.index);
    this.routes.get(`${baseRoute}/:id`, RecipientController.show);

    this.routes.use(authService);
    this.routes.post(`${baseRoute}/create`, RecipientController.store);
    this.routes.put(`${baseRoute}/update/:id`, RecipientController.update);
    this.routes.delete(`${baseRoute}/delete/:id`, RecipientController.delete);
  }

  deliveryman(baseRote) {
    this.routes.post(
      `${baseRote}/files`,
      this.upload.single('file'),
      FileController.store,
    );
  }
}

export default new Routes().routes;
