import Recipient from '../../models/Recipient';

class RecipientRepository extends Error {
  async listRecipients() {
    const recipients = await Recipient.findAll();
    return recipients;
  }

  async createRecipient(recipientData) {
    if (await Recipient.create(recipientData)) {
      return { message: 'Recipient created successfully' };
    }
    throw new Error('Could not save recipient');
  }

  async listOneRecipient(id) {
    const recipient = await Recipient.findByPk(id);

    if (recipient) {
      return recipient;
    }

    throw new Error(`There is no saved recipient with id ${id}`);
  }

  async updateRecipient(id, recipientData) {
    const recipient = await Recipient.findByPk(id);

    if (await recipient.update(recipientData)) {
      return { message: `Recipient ${recipient.name} updated successfully` };
    }

    throw new Error('Could not updated recipient');
  }

  async deleteRecipient(id) {
    if (await Recipient.destroy({ where: { id } })) {
      return { message: `Recipient ${id} deleted successfully` };
    }

    throw new Error('Could not deleted recipient');
  }
}

export default new RecipientRepository();
