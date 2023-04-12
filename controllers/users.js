const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AppError = require('../errors/AppError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        throw new AppError('Пользователь по указанному _id не найден.', 404);
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new AppError('Неверный формат данных в запросе', 400));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        user: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          emeil: user.email,
        },
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new AppError('Такой адрес электронной почты уже зарегистрирован', 409));
      } else if (err.name === 'ValidationError') {
        next(new AppError('Переданы некорректные данные при создании пользователя.', 400));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user === null) {
        throw new AppError('Пользователь с указанным _id не найден.', 404);
      }
      res.status(200).send({ name: user.name, about: user.about });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new AppError('Переданы некорректные данные при обновлении профиля.', 400));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user === null) {
        throw new AppError('Пользователь с указанным _id не найден.', 404);
      }
      res.status(200).send({ avatar: user.avatar });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new AppError('Переданы некорректные данные при обновлении аватара.', 400));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ _id: token });
    })
    .catch(() => {
      next(new AppError('Неправильные почта или пароль', 401));
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new AppError('пользователь не найден', 404);
      }
      res.status(200).send(user);
    })
    .catch((err) => next(err));
};
