import Recipient from '../../models/Recipient';

class RecipientRepository extends Error {
  async listAll() {
    const allRecipients = await Recipient.findAll();

    return allRecipients;
  }

  async create({ data }) {
    if (await Recipient.create(data)) {
      return { success_msg: 'Recipient created successfully' };
    }
    throw new Error('Could not save recipient');
  }

  async listOne(id) {
    const oneRecipient = await Recipient.findByPk(id);

    if (oneRecipient) {
      return oneRecipient;
    }

    throw new Error(`There is no saved recipient with id ${id}`);
  }

  async update(id, { data }) {
    const recipient = await Recipient.findByPk(id);

    if (await recipient.update(data)) {
      return {
        success_msg: `Recipient ${recipient.name} updated successfully`,
      };
    }

    throw new Error('Could not updated recipient');
  }

  async delete(id) {
    if (await Recipient.destroy({ where: { id } })) {
      return { success_msg: `Recipient ${id} deleted successfully` };
    }

    throw new Error('Could not deleted recipient');
  }
}

export default new RecipientRepository();
