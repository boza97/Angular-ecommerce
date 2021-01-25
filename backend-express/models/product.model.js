module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('product', {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    unitPrice: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    imagePath: {
      type: Sequelize.STRING,
      allowNull: false
    },
    unitsInStock: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    featured: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true
  });

  return Product;
}