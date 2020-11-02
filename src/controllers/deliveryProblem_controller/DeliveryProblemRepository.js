import DeliveryProblem from '../../models/DeliveryProblem';
import Delivery from '../delivery_controller/delivery_repository';

class DeliveryProblemRepository extends Error {
  async listAll() {
    const allDeliveriesProblem = await DeliveryProblem.findAll();

    if (allDeliveriesProblem) {
      return allDeliveriesProblem;
    }

    throw new Error("Can't list deliveries");
  }

  async listOne(deliveryProblem_id) {
    const deliveryProblem = await DeliveryProblem.findByPk(deliveryProblem_id);

    if (deliveryProblem) {
      return deliveryProblem;
    }
    throw new Error("Can't list delivery");
  }

  async create(order_id, data) {
    if (await DeliveryProblem.create({ order_id, ...data })) {
      return { success_msg: 'Delivery Problem created successfully' };
    }
    throw new Error('Cold not save Delivery Problem');
  }

  async cancel(deliveryProblem_id) {
    const deliveryProblem = await DeliveryProblem.findByPk(deliveryProblem_id);
    const orderId = deliveryProblem.order_id;

    await Delivery.cancel(orderId);
    return { order_id: orderId, deliveryProblem };
  }
}

export default new DeliveryProblemRepository();
