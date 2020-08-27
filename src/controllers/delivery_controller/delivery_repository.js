import { isBefore, isAfter, parseISO, startOfHour, setHours } from 'date-fns';
import Order from '../../models/Order';

class DeliveryRepository extends Error {
  async listAll(deliveryman_id) {
    const allDeliveries = await Order.findAll({
      where: { deliveryman_id, canceled_at: null, end_date: null },
    });

    if (allDeliveries) {
      return allDeliveries;
    }
    throw new Error("Can't list deliveries");
  }

  async listByStatus(deliveryman_id, status) {
    const deliveriesByStatus = await Order.findAll({
      where: { deliveryman_id, status },
    });

    if (deliveriesByStatus) {
      return deliveriesByStatus;
    }

    throw new Error("Can't list deliveries");
  }

  async listOne(order_id) {
    const oneDelivery = await Order.findByPk(order_id);

    return oneDelivery;
  }

  async start(order_id, start_date) {
    const order = await Order.findByPk(order_id);

    if (!order) {
      throw new Error(`Can't search order ${order_id}`);
    }

    this.checkShippingTime(start_date);

    if (await order.update({ start_date })) {
      return { success_msg: `Order ${order.product} send successfully`, order };
    }

    throw new Error('Could not send Order!');
  }

  async finalize(order_id, end_date) {
    const order = await Order.findByPk(order_id);

    if (!order) {
      throw new Error(`Can't search order ${order_id}`);
    }

    if (await order.update({ end_date })) {
      return { success_msg: `Order ${order.product} send successfully`, order };
    }

    throw new Error('Could not finalize Order!');
  }

  async cancel(order_id) {
    const order = Order.findByPk(order_id);

    if (!order) {
      throw new Error(`Can't search order ${order_id}`);
    }

    order.status = 'canceled';
    order.canceled_at = new Date();
    (await order).save();

    return { success_msg: `Order ${order_id} was canceled with success` };
  }

  checkShippingTime(hour) {
    const startTime = startOfHour(setHours(hour, 8));
    const endTime = startOfHour(setHours(hour, 18));

    if (
      isAfter(parseISO(hour), startTime) &&
      isBefore(parseISO(hour), endTime)
    ) {
      return true;
    }
    throw new Error(
      `The times available for sending from ${startTime} to ${endTime}`,
    );
  }
}

export default new DeliveryRepository();
