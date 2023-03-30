const routes = require('express').Router();
const { NOT_FOUND_ERROR } = require('../utils/res-constants');

routes.use('/users', require('./users'));
routes.use('/cards', require('./cards'));

routes.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Несуществующий маршрут. Ошибка: 404' });
});

module.exports = { routes };
