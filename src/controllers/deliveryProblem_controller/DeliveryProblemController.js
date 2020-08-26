import DeliveryProblem from './DeliveryProblemRepository';

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
      const delivery = await DeliveryProblem.listOne(req.params.id);

      return res.json(delivery);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async store(req, res) {
    try {
      const deliveryProblem = await DeliveryProblem.create(
        req.params.id,
        req.body,
      );

      return res.json(deliveryProblem);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async delete(req, res) {
    try {
      const delivery = await DeliveryProblem.cancel(req.params.id);

      return res.json(delivery);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }
}

export default new DeliveryProblemController();
