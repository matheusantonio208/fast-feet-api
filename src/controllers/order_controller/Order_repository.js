import { isBefore, isAfter, parseISO, startOfHour, setHours } from 'date-fns';
import Order from '../../models/Order';

class OrderRepository extends Error {
  async list(id) {
    const order = await Order.findByPk(id);

    return order;
  }

  async create(order) {
    if (await Order.create(order)) {
      return {
        success_msg: `Order ${order.product} created successfuly!`,
        name: order.product,
        id: order.id,
      };
    }
    throw new Error(`Could not save order ${order.product}`);
  }

  async sendOrder(id, startDate, endDate) {
    const order = await Order.findByPk(id);

    if (!this.checkHourToSend(startDate)) {
      throw new Error('The times available for sending from 08:00 to 18:00');
    }

    if ((await order).update({ start_date: startDate, end_date: endDate })) {
      return {
        success_msg: `Order ${order.product} send successfully`,
        order,
      };
    }

    throw new Error('Could not send Order!');
  }

  checkHourToSend(hour) {
    const startHourDelivery = startOfHour(setHours(parseISO(hour), 8));
    const endHourDelivery = startOfHour(setHours(parseISO(hour), 18));

    if (
      isAfter(parseISO(hour), startHourDelivery) &&
      isBefore(parseISO(hour), endHourDelivery)
    ) {
      return true;
    }
    return false;
  }

  async toCancel(id) {
    const order = await Order.findByPk(id);

    if (!order) {
      throw new Error(`Order ${id} was not found`);
    }

    order.canceled_at = new Date();
    await order.save();

    return { success_msg: `Order ${id} was canceled with success` };
  }
}

export default new OrderRepository();
