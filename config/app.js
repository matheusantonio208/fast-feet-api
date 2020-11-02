import 'dotenv/config';
import express from 'express';
import routes from '../src/controllers/routes';
import cors from 'cors';

import './postgresDB/database-connection';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
