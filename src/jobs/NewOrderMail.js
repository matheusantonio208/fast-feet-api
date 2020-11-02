import Email from '../services/mail-services';

class NewOrderMail {
  get key() {
    return 'KeyUniqueJob';
  }

  async handle({ data }) {
    const { deliveryman, order, recipient } = data;

    await Email.sendEmail({
      to: deliveryman.email,
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
}

export default new NewOrderMail();
