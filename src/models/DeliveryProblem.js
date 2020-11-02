import Sequelize, { Model } from 'sequelize';

class DeliveryProblem extends Model {
  static init(connection) {
    super.init(
      {
        description: Sequelize.STRING,
        delivery_id: Sequelize.INTEGER,
      },
      { sequelize: connection },
    );
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'order_id' });
  }
}

export default DeliveryProblem;
