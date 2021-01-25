const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./product.model.js')(sequelize, Sequelize);
db.categories = require('./category.model.js')(sequelize, Sequelize);
db.users = require('./user.model.js')(sequelize, Sequelize);
db.orders = require('./order.model.js')(sequelize, Sequelize);
db.orderItems = require('./order-item.model.js')(sequelize, Sequelize);

db.products.belongsTo(db.categories, {foreignKey: 'category_id'});
db.categories.hasMany(db.products, {foreignKey: 'category_id'});
db.users.hasMany(db.orders, {foreignKey: 'user_id'});
db.orders.belongsTo(db.users, {foreignKey: 'user_id'});
db.orders.hasMany(db.orderItems, {foreignKey: 'order_id'});
db.orderItems.belongsTo(db.orders, {foreignKey: 'order_id'});
db.orderItems.belongsTo(db.products, {foreignKey: 'product_id'});

module.exports = db;