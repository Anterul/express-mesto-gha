const { errors } = require('celebrate');
const routes = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const AppError = require('../errors/AppError');
const { validateUser } = require('../utils/validators');

routes.all('*', validateUser);
routes.post('/signin', login);
routes.post('/signup', createUser);

routes.use(auth);

routes.use('/users', require('./users'));
routes.use('/cards', require('./cards'));

routes.all('*', (req, res, next) => {
  next(new AppError('Несуществующий маршрут.', 404));
});

routes.use(errors());

routes.use((err, req, res, next) => {
  next(res.status(err.statusCode || 500).json({ status: err.status, message: err.message }));
});

module.exports = { routes };
