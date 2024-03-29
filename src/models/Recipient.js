import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        cep: Sequelize.INTEGER,
      },
      { sequelize: connection },
    );
  }
}

export default Recipient;
