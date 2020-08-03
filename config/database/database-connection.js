import Sequelize from 'sequelize';

import databaseConfig from './database-config';

import Recipients from '../../src/models/Recipient';
import Users from '../../src/models/User';

class DatabaseConnection {
  constructor() {
    const models = [Recipients, Users];
    const connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(connection));
  }
}

export default new DatabaseConnection();
