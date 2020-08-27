import DeliveryProblem from './DeliveryProblemRepository';
import Deliveryman from '../deliveryman_controller/deliveryman_repository';
import Delivery from '../delivery_controller/delivery_repository';
import Recipient from '../recipient_controller/recipient_repository';

import Queue from '../../../lib/Queue';
import CancelOrderMail from '../../jobs/CancelOrderMail';

class DeliveryProblemController {
  async index(req, res) {
    try {
      const deliveries = await DeliveryProblem.listAll();

      return res.json(deliveries);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async show(req, res) {
    try {
      const delivery = await DeliveryProblem.listOne(
        req.params.deliveryProblem_id,
      );

      return res.json(delivery);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async store(req, res) {
    try {
      const deliveryProblem = await DeliveryProblem.create(
        req.params.order_id,
        req.body,
      );

      return res.json(deliveryProblem);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async delete(req, res) {
    try {
      const isCancel = await DeliveryProblem.cancel(
        req.params.deliveryProblem_id,
      );

      if (isCancel) {
        const { deliveryProblem } = isCancel;
        const order = await Delivery.listOne(isCancel.order_id);
        const deliveryman = await Deliveryman.listOne(order.deliveryman_id);
        const recipient = await Recipient.listOne(order.recipient_id);

        await Queue.add(CancelOrderMail.key, {
          order,
          deliveryman,
          deliveryProblem,
          recipient,
        });
      }
      return res.json(isCancel);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }
}

export default new DeliveryProblemController();
