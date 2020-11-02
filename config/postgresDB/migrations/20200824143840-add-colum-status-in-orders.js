module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'status', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('orders', 'status');
  },
};
