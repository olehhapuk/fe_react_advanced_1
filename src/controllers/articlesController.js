/*
exports.getAll = (req, res) => {
  res.render('articles-list', { articles: articlesData });
}
*/
// export const a = 1;

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

function getAll(req, res) {
  res.render('articles-list', { articles: articlesData });
}

function getById(req, res) {
  const target = articlesData[req.params.id];
  res.render('article', { article: target });
}

// export default { getAll, getById };
module.exports = { getAll, getById };