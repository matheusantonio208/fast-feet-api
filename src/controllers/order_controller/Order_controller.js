import Order from './Order_repository';
import Deliveryman from '../deliveryman_controller/deliveryman_repository';
import Recipient from '../recipient_controller/recipient_repository';

import Queue from '../../../lib/Queue';
import NewOrderMail from '../../jobs/NewOrderMail';

class OrderController {
  async index(req, res) {
    try {
      const order = await Order.listAll(req.params.id);

      return res.json(order);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async store(req, res) {
    try {
      const order = await Order.create(req.body);

      if (order) {
        const deliveryman = await Deliveryman.listOne(req.body.deliveryman_id);
        const recipient = await Recipient.listOne(req.body.recipient_id);

        await Queue.add(NewOrderMail.key, { deliveryman, recipient, order });
      }

      return res.json(order);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }
}

export default new OrderController();
