import Order from './Order_repository';
import Deliveryman from '../deliveryman_controller/deliveryman_repository';
import Recipient from '../recipient_controller/recipient_repository';
import Email from '../../services/mail-services';

class OrderController {
  async index(req, res) {
    try {
      const order = await Order.list(req.params.id);

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

        await Email.sendEmail({
          to: `${deliveryman.email}`,
          subject: `Nova encomenda ${order.name} para ser entregue`,
          text: 'Você tem uma nova entrega para ser efetuada',
          template: 'newOrder',
          context: {
            deliveryman: deliveryman.name,
            order_id: order.id,
            product: order.name,
            recipient: recipient.name,
            street: recipient.street,
            number: recipient.number,
            complement: recipient.complement,
            state: recipient.state,
            city: recipient.city,
            cep: recipient.cep,
          },
        });
      }

      return res.json(order);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async update(req, res) {
    try {
      const { start_date, end_date } = req.body;

      const orderDispatched = await Order.sendOrder(
        req.params.id,
        start_date,
        end_date,
      );

      return res.json(orderDispatched);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async delete(req, res) {
    try {
      const orderCanceled = await Order.toCancel(req.params.id);
      return res.json(orderCanceled);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }
}

export default new OrderController();
