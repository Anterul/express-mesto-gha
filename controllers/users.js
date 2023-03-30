const User = require('../models/user');
const {
  INCORRECT_ERROR,
  NOT_FOUND_ERROR,
  RES_CREATE_OK,
  RES_OK,
} = require('../utils/res-constants');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(RES_OK).send(users))
    .catch(() => next(new Error('На сервере произошла ошибка')));
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(RES_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(res.status(INCORRECT_ERROR).send({ message: 'Неверный формат данных в запросе' }));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(RES_CREATE_OK).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(res.status(INCORRECT_ERROR).send({ message: 'Переданы некорректные данные при создании пользователя.' }));
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
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь с указанным _id не найден.' });
      }
      res.status(RES_OK).send({ name: user.name, about: user.about });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(res.status(INCORRECT_ERROR).send({ message: 'Переданы некорректные данные при обновлении профиля.' }));
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
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь с указанным _id не найден.' });
      }
      return res.status(RES_OK).send({ avatar: user.avatar });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(res.status(INCORRECT_ERROR).send({ message: 'Переданы некорректные данные при обновлении аватара.' }));
      } else {
        next(err);
      }
    });
};
