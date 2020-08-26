import Email from '../services/mail-services';

class CancelOrderMail {
  get key() {
    return 'cancelOrderMail';
  }

  async handle({ data }) {
    const { deliveryman, order, deliveryProblem, recipient } = data;

    await Email.sendEmail({
      to: deliveryman.email,
      subject: `Encomenda ${order.product} cancelada`,
      text: 'Você tem uma entrega que foi cancelada',
      template: 'cancelOrder',
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
        description: deliveryProblem.description,
      },
    });
  }
}

export default new CancelOrderMail();
