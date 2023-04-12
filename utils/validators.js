const { celebrate, Joi } = require('celebrate');
const { RegExUrl } = require('./regEx');

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('поле "email" должно быть валидным адресом электронной почты')
      .messages({
        'string.empty': 'поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().min(4)
      .messages({
        'string.min': 'минимальная длина поля "password" - 4',
        'string.empty': 'поле "password" должно быть заполнено',
      }),
  }),
});

module.exports.validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля "name" - 2',
        'string.max': 'максимальная длина поля "name" - 30',
        'string.empty': 'поле "name" должно быть заполнено',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля "about" - 2',
        'string.max': 'максимальная длина поля "about" - 30',
        'string.empty': 'поле "about" должно быть заполнено',
      }),
    avatar: Joi.string().regex(RegExUrl)
      .message('поле "avatar" должно быть валидным url-адресом')
      .messages({
        'string.empty': 'поле "avatar" должно быть заполнено',
      }),
    email: Joi.string().required().email()
      .message('поле "email" должно быть валидным адресом электронной почты')
      .messages({
        'string.empty': 'поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().min(4)
      .messages({
        'string.min': 'минимальная длина поля "password" - 4',
        'string.empty': 'поле "password" должно быть заполнено',
      }),
  }),
});

module.exports.validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля "name" - 2',
        'string.max': 'максимальная длина поля "name" - 30',
        'string.empty': 'поле "name" должно быть заполнено',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля "about" - 2',
        'string.max': 'максимальная длина поля "about" - 30',
        'string.empty': 'поле "about" должно быть заполнено',
      }),
  }),
});

module.exports.validateAvarar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(RegExUrl)
      .message('поле "avatar" должно быть валидным url-адресом')
      .messages({
        'string.empty': 'поле "avatar" должно быть заполнено',
      }),
  }),
});

module.exports.validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля "name" - 2',
        'string.max': 'максимальная длина поля "name" - 30',
        'string.empty': 'поле "name" должно быть заполнено',
      }),
    link: Joi.string().required().regex(RegExUrl)
      .message('поле "link" должно быть валидным url-адресом')
      .messages({
        'string.empty': 'поле "link" должно быть заполнено',
      }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24)
      .message('поле "id" должно состоять из 24 символов')
      .messages({
        'string.empty': 'поле "id" должно быть заполнено',
      }),
  }),
});
