import { Router } from 'express';
import multer from 'multer';

import multerConfig from '../../config/multer';

import FileController from './file_controller/file_controller';
import SessionController from './session_controller/session_controller';
import RecipientController from './recipient_controller/recipient_controller';
import DeliverymanController from './deliveryman_controller/deliveryman_controller';
import OrderController from './order_controller/Order_controller';

import authService from '../services/auth-service';

class Routes {
  constructor() {
    this.routes = new Router();
    this.upload = multer(multerConfig);

    this.session('/session');
    this.recipient('/recipient');
    this.deliveryman('/deliveryman');
    this.order('/order');
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

    this.routes.post(`${baseRote}`, DeliverymanController.store);
    this.routes.get(`${baseRote}`, DeliverymanController.index);
    this.routes.get(`${baseRote}/:id`, DeliverymanController.show);
    this.routes.put(`${baseRote}/:id`, DeliverymanController.update);
    this.routes.delete(`${baseRote}/:id`, DeliverymanController.delete);
  }

  order(baseRoute) {
    this.routes.get(`${baseRoute}/:id`, OrderController.index);
    this.routes.post(`${baseRoute}`, OrderController.store);
    this.routes.put(`${baseRoute}/:id`, OrderController.update);
    this.routes.delete(`${baseRoute}/:id`, OrderController.delete);
  }
}

export default new Routes().routes;
