const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '642109bc0366e10d9cb8ffe9',
  };

  next();
});
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
