const jwt = require('jsonwebtoken');
const Unauthorized = require('../utils/errors/Unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Unauthorized('Необходима авторизация');
    }
  } catch (err) {
    next(err);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
    if (!payload) {
      throw new Unauthorized('Необходима авторизация');
    }
  } catch (err) {
    next(err);
  }

  req.user = payload;

  next();
};
