import { Router } from 'express';

import sessionController from './session_controller/session_controller';
import recipientController from './recipient_controller/recipient_controller';

import authService from '../services/auth-service';

class Routes {
  constructor() {
    this.routes = new Router();

    this.session('/session');
    this.recipient('/recipient');
  }

  session(baseRote) {
    this.routes.post(`${baseRote}`, sessionController.store);
  }

  recipient(baseRoute) {
    this.routes.get(`${baseRoute}`, recipientController.index);
    this.routes.get(`${baseRoute}/:id`, recipientController.show);

    this.routes.use(authService);
    this.routes.post(`${baseRoute}/create`, recipientController.store);
    this.routes.put(`${baseRoute}/update/:id`, recipientController.update);
    this.routes.delete(`${baseRoute}/delete/:id`, recipientController.delete);
  }
}

export default new Routes().routes;
