const express = require('express');

const { Book } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.json(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/:bookId', async (req, res) => {
  try {
    const targetBook = await Book.findById(req.params.bookId).populate(
      'author'
    );
    res.json(targetBook);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete('/:bookId', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.json({
      message: 'Book was deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put('/:bookId', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedBook);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
