const { celebrate, Joi } = require('celebrate');
const { RegExUrl } = require('./regEx');

module.exports.validateUser = celebrate({
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
    link: Joi.string().regex(RegExUrl)
      .message('поле "link" должно быть валидным url-адресом')
      .messages({
        'string.empty': 'поле "link" должно быть заполнено',
      }),
  }),
});
