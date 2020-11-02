import Recipient from './recipient_repository';

class RecipientController {
  async index(req, res) {
    try {
      const allRecipients = await Recipient.listAll();

      return res.json(allRecipients);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async show(req, res) {
    try {
      const oneRecipient = await Recipient.listOne(req.params.id);

      return res.json(oneRecipient);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async store(req, res) {
    try {
      const { name, street, number, complement, state, city, cep } = req.body;
      const newRecipient = await Recipient.create({
        name,
        street,
        number,
        complement,
        state,
        city,
        cep,
      });

      return res.json(newRecipient);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async update(req, res) {
    try {
      const { name, street, number, complement, state, city, cep } = req.body;
      const updatedRecipient = await Recipient.update(req.params.id, {
        name,
        street,
        number,
        complement,
        state,
        city,
        cep,
      });

      return res.json(updatedRecipient);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }

  async delete(req, res) {
    try {
      const deletedRecipient = await Recipient.delete(req.params.id);

      return res.json(deletedRecipient);
    } catch (error) {
      return res.status(400).json({ error_msg: error.toString() });
    }
  }
}
export default new RecipientController();
