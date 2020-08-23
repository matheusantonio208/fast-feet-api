import { Router } from 'express';
import multer from 'multer';

import multerConfig from '../services/multer-service';

import File from './file_controller/file_controller';
import Session from './session_controller/session_controller';
import Recipient from './recipient_controller/recipient_controller';
import Deliveryman from './deliveryman_controller/deliveryman_controller';
import Order from './order_controller/Order_controller';

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
    this.routes.post(`${baseRote}`, Session.store);
  }

  recipient(baseRoute) {
    this.routes.get(`${baseRoute}`, Recipient.index);
    this.routes.get(`${baseRoute}/:id`, Recipient.show);

    this.routes.use(authService);
    this.routes.post(`${baseRoute}/create`, Recipient.store);
    this.routes.put(`${baseRoute}/update/:id`, Recipient.update);
    this.routes.delete(`${baseRoute}/delete/:id`, Recipient.delete);
  }

  deliveryman(baseRote) {
    this.routes.post(
      `${baseRote}/files`,
      this.upload.single('file'),
      File.store,
    );

    this.routes.post(`${baseRote}`, Deliveryman.store);
    this.routes.get(`${baseRote}`, Deliveryman.index);
    this.routes.get(`${baseRote}/:id`, Deliveryman.show);
    this.routes.put(`${baseRote}/:id`, Deliveryman.update);
    this.routes.delete(`${baseRote}/:id`, Deliveryman.delete);
  }

  order(baseRoute) {
    this.routes.get(`${baseRoute}/:id`, Order.index);
    this.routes.post(`${baseRoute}`, Order.store);
    this.routes.put(`${baseRoute}/:id`, Order.update);
    this.routes.delete(`${baseRoute}/:id`, Order.delete);
  }
}

export default new Routes().routes;
