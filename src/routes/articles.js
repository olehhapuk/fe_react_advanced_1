const express = require('express');

const router = express.Router();

const articlesData = [
  {
    id: 1,
    title: 'Title 1',
    text: 'Some text',
  },
  {
    id: 2,
    title: 'Title 2',
    text: 'Some text',
  },
];

// GET /articles
router.get('/', (req, res) => {
  // res.json(articlesData);
  res.render('articles-list', { articles: articlesData });
});

// GET /articles/:id
router.get('/:id', (req, res) => {
  const target = articlesData[req.params.id];
  res.json(target);
});

module.exports = router;
