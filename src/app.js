const express = require('express');
require('dotenv').config();
const volleyball = require('volleyball');

const usersRouter = require('./routes/usersRouter');
const contactsRouter = require('./routes/contactsRouter');

const app = express();

app.use(express.json());
app.use(volleyball);

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.log(error);
  res.status(statusCode).send(error.message);
});

module.exports = app;
