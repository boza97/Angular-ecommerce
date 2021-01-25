module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define(
    "order_item",
    {
      orderId: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    }
  );

  return OrderItem;
};
