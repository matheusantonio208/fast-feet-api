import DeliveryProblem from '../../models/DeliveryProblem';
import Delivery from '../delivery_controller/delivery_repository';

class DeliveryProblemRepository extends Error {
  async listAll() {
    const deliveriesProblem = await DeliveryProblem.findAll();

    if (deliveriesProblem) {
      return deliveriesProblem;
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

  async create(delivery_id, data) {
    if (await DeliveryProblem.create({ delivery_id, ...data })) {
      return { success_msg: 'Delivery Problem created successfully' };
    }
    throw new Error('Cold not save Delivery Problem');
  }

  async cancel(delivery_id) {
    const deliveryProblem = await DeliveryProblem.findByPk(delivery_id);
    const orderId = deliveryProblem.delivery_id;

    const orderCancel = await Delivery.cancel(orderId);
    return { deliveryProblem, orderCancel };
  }
}

export default new DeliveryProblemRepository();
