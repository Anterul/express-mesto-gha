[![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)

-----------------

# Mesto Express <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/nodejs/nodejs-original.svg" alt="Node.js" style="width: 20px;"/><img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/express/express-original.svg" alt="Express" style="width: 20px;"/>

## Учебная проектная работа 14 от [Яндекс.Практикум](https://practicum.yandex.ru/)

## Описание проекта:
  **Mesto Express** - это серверная часть социальной сети Mesto, написанная на Node.js и Express.

## Приложение **Mesto Express** на [GitHub](https://github.com/Anterul/express-mesto-gha) <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/github/github-original.svg" alt="GitHub" width="20px"/>



---

## Функциональность приложения:
  * Создание и авторизация в своей учётной записи
  * Получение массива с соданными на сервере пользователями и карточками
  * Изменение иформации в личном профиле
  * Создание и удаление только своих карточек
  * Постановка и снятие лайка на карточках
---

## Используемые технологии:  
  * <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/javascript/javascript-original.svg" alt="Javascript" width="10px"/> JavaScript:
    - ООП
    - API
  * <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/nodejs/nodejs-original.svg" alt="React" width="10px"/> Node.js:
    - celebrate
    - jsonwebtoken
    - bcryptjs
  * <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/express/express-original.svg" alt="React" width="10px"/> Express:
    - ProtectedRoutes
  * <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="10px"/> MongoDB:
    - Mongoose

---

## Установка:  
Клонируйте репозиторий <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/bash/bash-original.svg" alt="Bash" width="10px"/> :

    git clone https://github.com/Anterul/express-mesto-gha

Перейдите в директорию, в которую был клонирован проект, введите комнды. Процесс установки может занять несколько минут.  
Необходимые приложения для ввода команд: &nbsp; <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/git/git-original.svg" alt="Git" width="10px"/> [Git](https://git-scm.com/download/win) &nbsp; <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/nodejs/nodejs-original.svg" alt="Node.js" width="10px"/> [Node.js](https://nodejs.org/ru/) &nbsp; <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="10px"/> [MongoDB](https://mongodb.prakticum-team.ru/try/download/community) 

    npm install express

    npm install mongoose

    npm i body-parser

    npm install nodemon  

## Запуск проекта

    npm run start — запускает сервер 

    npm run dev — запускает сервер с hot-reload 

После этого проект автоматически откроется в браузере. Если этого не произошло, откройте проект в браузере, введя адрес:


    http://localhost:3000/  

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки 

---
