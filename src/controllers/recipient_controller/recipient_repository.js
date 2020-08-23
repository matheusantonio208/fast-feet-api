import Recipient from '../../models/Recipient';

class RecipientRepository extends Error {
  async list() {
    const recipients = await Recipient.findAll();
    return recipients;
  }

  async create(recipientData) {
    if (await Recipient.create(recipientData)) {
      return { message: 'Recipient created successfully' };
    }
    throw new Error('Could not save recipient');
  }

  async listOne(id) {
    const recipient = await Recipient.findByPk(id);

    if (recipient) {
      return recipient;
    }

    throw new Error(`There is no saved recipient with id ${id}`);
  }

  async update(id, recipientData) {
    const recipient = await Recipient.findByPk(id);

    if (await recipient.update(recipientData)) {
      return { message: `Recipient ${recipient.name} updated successfully` };
    }

    throw new Error('Could not updated recipient');
  }

  async delete(id) {
    if (await Recipient.destroy({ where: { id } })) {
      return { message: `Recipient ${id} deleted successfully` };
    }

    throw new Error('Could not deleted recipient');
  }
}

export default new RecipientRepository();
