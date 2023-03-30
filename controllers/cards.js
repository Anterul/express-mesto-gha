const Card = require('../models/card');
const {
  INCORRECT_ERROR,
  NOT_FOUND_ERROR,
  RES_CREATE_OK,
  RES_OK,
} = require('../utils/res-constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(RES_OK).send({ data: cards }))
    .catch(() => next(new Error('На сервере произошла ошибка')));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user })
    .then((card) => res.status(RES_CREATE_OK).send({
      name: card.name,
      link: card.link,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(res.status(INCORRECT_ERROR)
          .send({ message: 'Переданы некорректные данные при создании карточки.' }));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND_ERROR)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      }
      res.status(RES_OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(res.status(INCORRECT_ERROR)
          .send({ message: 'Переданы некорректные данные для удаления карточки.' }));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND_ERROR)
          .send({ message: 'Передан несуществующий _id карточки.' });
      }
      res.status(RES_OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(res.status(INCORRECT_ERROR)
          .send({ message: 'Переданы некорректные данные для постановки лайка.' }));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND_ERROR)
          .send({ message: 'Передан несуществующий _id карточки.' });
      }
      res.status(RES_OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(res.status(INCORRECT_ERROR)
          .send({ message: 'Переданы некорректные данные для снятия лайка.' }));
      } else {
        next(err);
      }
    });
};
