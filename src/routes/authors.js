const express = require('express');

const { Author } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.json(newAuthor);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/:authorId', async (req, res) => {
  try {
    const author = await Author.findById(req.params.authorId).populate('books');
    res.json(author);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
