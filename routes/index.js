const { errors } = require('celebrate');
const routes = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const AppError = require('../errors/AppError');
const { validateRegister, validateLogin } = require('../utils/validators');

routes.post('/signin', validateLogin, login);
routes.post('/signup', validateRegister, createUser);

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
