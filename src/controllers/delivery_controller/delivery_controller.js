import Deliveries from './delivery_repository';

class DeliveryController {
  async index(req, res) {
    try {
      const deliveries = await Deliveries.listAll(req.params.id);

      return res.json(deliveries);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async show(req, res) {
    try {
      const deliveries = await Deliveries.listByStatus(
        req.params.id,
        req.query.status,
      );

      return res.json(deliveries);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async update(req, res) {
    try {
      const { order_id, start_date, end_date } = req.body;

      if (start_date) {
        const orderInTransit = await Deliveries.start(order_id, start_date);
        return res.json(orderInTransit);
      }

      if (end_date) {
        const orderDelivered = await Deliveries.finalize(order_id, end_date);
        return res.json(orderDelivered);
      }

      return res.status(400).json({
        error_msg:
          'Please enter the date of departure or completion of delivery',
      });
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async delete(req, res) {
    try {
      const { order_id } = req.body;

      const canceledDelivery = await Deliveries.cancel(order_id);

      return res.json(canceledDelivery);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }
}

export default new DeliveryController();
