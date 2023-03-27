const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Роизошла ошибка ${err}` }));
};

const getUserId = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Роизошла ошибка ${err}` }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  })
    .then(() => {
      res.status(200).send({
        name,
        about,
        avatar,
      });
    })
    .catch((err) => res.status(500).send({ message: `Роизошла ошибка ${err}` }));
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
};
