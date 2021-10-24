const express = require('express');
const volleyball = require('volleyball');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const { authors, books } = require('./routes');

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected successfully'))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

app.use(express.json());
app.use(volleyball);
app.use(helmet());
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Resource: books
// /api/books - All books
// /api/books/:bookId - Target book

// router.get('/books');

app.use('/api/books', books);
app.use('/api/authors', authors);

module.exports = app;
