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

module.exports = router;
