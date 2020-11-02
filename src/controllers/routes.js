import { Router } from 'express';
import multer from 'multer';

import multerConfig from '../services/multer-service';

import File from './file_controller/file_controller';
import Session from './session_controller/session_controller';
import Recipient from './recipient_controller/recipient_controller';
import Deliveryman from './deliveryman_controller/deliveryman_controller';
import Delivery from './delivery_controller/delivery_controller';
import Order from './order_controller/Order_controller';
import DeliveryProblem from './deliveryProblem_controller/DeliveryProblemController';

import authService from '../services/auth-service';

class Routes {
  constructor() {
    this.routes = new Router();
    this.upload = multer(multerConfig);

    this.session('/session');
    this.recipient('/recipient');
    this.deliveryman('/deliveryman');
    this.order('/order');
    this.deliveryProblems('/delivery');
  }

  session(baseRote) {
    this.routes.post(`${baseRote}`, Session.store);
  }

  deliveryProblems(baseRote) {
    this.routes.get(`${baseRote}/problems`, DeliveryProblem.index);
    this.routes.get(
      `${baseRote}/:deliveryProblem_id/problems`,
      DeliveryProblem.show,
    );
    this.routes.post(`${baseRote}/:order_id/problems`, DeliveryProblem.store);
    this.routes.delete(
      `${baseRote}/problem/:deliveryProblem_id/cancel-delivery`,
      DeliveryProblem.delete,
    );
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
    this.routes.get(`${baseRote}/:id/deliveries`, Delivery.index);
    this.routes.get(`${baseRote}/:id/deliveries/status`, Delivery.show);
    this.routes.put(`${baseRote}/:id`, Deliveryman.update);
    this.routes.delete(`${baseRote}/:id`, Deliveryman.delete);
  }

  order(baseRoute) {
    this.routes.get(`${baseRoute}/:id`, Order.index);
    this.routes.post(`${baseRoute}`, Order.store);
  }
}

export default new Routes().routes;
