const User = require('../models/user');
const IncorrectData = require('../errors/IncorrectData');
const NotFound = require('../errors/NotFound');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.satus(200).send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFound('Пользователь по указанному _id не найден.'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  })
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData('Переданы некорректные данные при создании пользователя.'));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        throw new IncorrectData('Переданы некорректные данные при обновлении профиля.');
      }
      return res.status(200).send({ name: user.name, about: user.about });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFound('Пользователь с указанным _id не найден.'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        throw new IncorrectData('Переданы некорректные данные при обновлении аватара.');
      }
      return res.status(200).send({ avatar: user.avatar });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFound('Пользователь с указанным _id не найден.'));
      } else {
        next(err);
      }
    });
};
