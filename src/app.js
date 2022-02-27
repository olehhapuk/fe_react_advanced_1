const express = require('express');
const volleyball = require('volleyball');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const apiRouter = require('./routes/apiRouter');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Database connected successfully'))
    .catch((error) => console.log(error));
}

app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(volleyball);
}
app.use(helmet());
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Routes
app.use('/api', apiRouter);

// app.use('/api', volleyball, apiRouter);
// app.use('/', pagesRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({
    message: error.message,
  });
});

module.exports = app;
