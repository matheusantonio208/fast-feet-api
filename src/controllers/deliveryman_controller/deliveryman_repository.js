import Deliveryman from '../../models/Deliveryman';

class DeliverymanRepository extends Error {
  async create(deliveryman) {
    const { name, email } = deliveryman;

    if (await Deliveryman.create({ name, email })) {
      return { success_msg: 'Deliveryman created successfully' };
    }

    throw new Error('Cold not save Deliveryman');
  }

  async listAll() {
    const deliveryman = await Deliveryman.findAll();

    return deliveryman;
  }

  async listOne(id) {
    const deliveryman = await Deliveryman.findByPk(id);
    if (deliveryman) {
      return deliveryman;
    }

    throw new Error(`There is no saved deliveryman with id ${id}`);
  }

  async update(id, updateDeliveryman) {
    const deliveryman = await Deliveryman.findByPk(id);

    if (await deliveryman.update(updateDeliveryman)) {
      return { success_msg: `Deliveryman ${id} updated successfully` };
    }

    throw new Error(`Could not updated deliveryman ${id}`);
  }

  async delete(id) {
    if (await Deliveryman.destroy({ where: { id } })) {
      return { success_msg: `Deliveryman ${id} deleted successfully` };
    }

    throw new Error(`Could not deleted recipient`);
  }
}

export default new DeliverymanRepository();
