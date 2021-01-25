module.exports = app => {
  const ordersController = require('../controllers/orders.controller');
  const orderValidator = require('../middleware/validators/order.validator');
  const isAuth = require('../middleware/is-auth.service');
  var router = require('express').Router();

  router.get('/', isAuth, ordersController.findAllByUser);
  router.get('/:id', isAuth, ordersController.findOne);
  router.post('/', isAuth, orderValidator.order, ordersController.store);

  app.use('/api/orders', router);
}