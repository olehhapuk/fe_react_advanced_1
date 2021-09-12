const express = require('express');
const path = require('path');
const volleyball = require('volleyball');

const app = express();

// function logger(req, res, next) {
//   console.log(`${res.statusCode} - ${req.ip}`);
//   next();
// }

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname + '/public')));
app.use(volleyball);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', { title: 'Web-App' });
});

app.get('/info', (req, res) => {
  res.send('Info');
});

app.get('/data', (req, res) => {
  console.log(req.query.page);
  res.send('Data');
});

app.get('/data/:id', (req, res) => {
  res.send(`Data #${req.params.id}`);
});

app.post('/body', (req, res) => {
  console.log(req.body);
  res.json('Success');
});

app.listen(5000, () => {
  console.log('Server is running at port 5000');
});
