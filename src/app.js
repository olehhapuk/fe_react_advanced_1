const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const tasks = require('./routes/tasks');

const app = express();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log('Connected to database'))
  .catch((error) => console.log(error));

app.use(volleyball);
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());

app.use('/api/tasks', tasks);

module.exports = app;
