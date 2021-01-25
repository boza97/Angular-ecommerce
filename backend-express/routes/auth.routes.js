module.exports = app => {
  const authController = require('../controllers/auth.controller.js');
  const authValidator = require('../middleware/validators/auth.validator.js');
  var router = require('express').Router();

  router.post('/login', authValidator.login, authController.login);
  router.post('/register', authValidator.register, authController.register);

  app.use('/api', router);
}