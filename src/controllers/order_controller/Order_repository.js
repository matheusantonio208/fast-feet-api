import Order from '../../models/Order';

class OrderRepository extends Error {
  async listAll(id) {
    const order = await Order.findByPk(id);

    return order;
  }

  async create(order) {
    if (await Order.create(order)) {
      return {
        success_msg: `Order ${order.product} created successfully!`,
        name: order.product,
        id: order.id,
      };
    }
    throw new Error(`Could not save order ${order.product}`);
  }
}

export default new OrderRepository();
