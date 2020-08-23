import Sequelize from 'sequelize';

import databaseConfig from './database-config';

import Recipient from '../../src/models/Recipient';
import User from '../../src/models/User';
import File from '../../src/models/File';
import Deliveryman from '../../src/models/Deliveryman';
import Order from '../../src/models/Order';

const models = [Recipient, User, File, Deliveryman, Order];
class DatabaseConnection {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(
      (model) => model.init(this.connection),
      (model) => model.associate && model.associate(this.connection.models),
    );
  }
}

export default new DatabaseConnection();
