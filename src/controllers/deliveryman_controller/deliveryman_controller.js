import Deliveryman from './deliveryman_repository';

class DeliverymanController {
  async index(req, res) {
    try {
      const deliveryman = await Deliveryman.listAll();

      return res.json(deliveryman);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async show(req, res) {
    try {
      const deliveryman = await Deliveryman.listOne(req.params.id);

      return res.json(deliveryman);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async store(req, res) {
    try {
      const deliveryman = await Deliveryman.create(req.body);

      return res.json(deliveryman);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async delete(req, res) {
    try {
      const deliveryman = await Deliveryman.delete(req.params.id);

      return res.json(deliveryman);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async update(req, res) {
    try {
      const deliveryman = await Deliveryman.update(req.params.id, req.body);

      return res.json(deliveryman);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }
}

export default new DeliverymanController();
