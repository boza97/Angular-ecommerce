module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true
  });

  return Category;
};
