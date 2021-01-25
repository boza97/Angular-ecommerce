module.exports = app => {
  const productsController = require('../controllers/product.controller.js');
  var router = require('express').Router();

  router.get('/', productsController.findAll);
  router.get('/featured', productsController.findAllFeatured);
  router.get('/:id', productsController.findOne);
  router.get('/category/:categoryId', productsController.findAllByCategory);

  app.use('/api/products', router);
}