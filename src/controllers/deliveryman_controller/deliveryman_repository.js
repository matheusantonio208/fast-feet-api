import Deliveryman from '../../models/Deliveryman';

class DeliverymanRepository extends Error {
  async create({ data }) {
    if (await Deliveryman.create(data)) {
      return { success_msg: 'Deliveryman created successfully' };
    }

    throw new Error('Cold not save Deliveryman');
  }

  async listAll() {
    const allDeliveryman = await Deliveryman.findAll();

    if (allDeliveryman) {
      return allDeliveryman;
    }
    throw new Error(`Can't list deliveryman`);
  }

  async listOne(id) {
    const oneDeliveryman = await Deliveryman.findByPk(id);

    if (oneDeliveryman) {
      return oneDeliveryman;
    }

    throw new Error(`Can't list deliveryman with id ${id}`);
  }

  async update(id, { data }) {
    const updatedDeliveryman = await Deliveryman.findByPk(id);

    if (await updatedDeliveryman.update(data)) {
      return { success_msg: `Deliveryman ${id} updated successfully` };
    }

    throw new Error(`Could not updated deliveryman ${id}`);
  }

  async delete(id) {
    if (await Deliveryman.destroy({ where: { id } })) {
      return { success_msg: `Deliveryman ${id} deleted successfully` };
    }

    throw new Error(`Could not deleted deliveryman`);
  }
}

export default new DeliverymanRepository();
