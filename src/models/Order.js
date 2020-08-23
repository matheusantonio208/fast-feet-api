import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(connection) {
    super.init(
      {
        product: Sequelize.STRING,
        signature_id: Sequelize.INTEGER,
        recipient_id: Sequelize.INTEGER,
        deliveryman_id: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      { sequelize: connection },
    );
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
  }
}

export default Order;
