const express = require('express');
const path = require('path');

const app = express();

function loggerMiddleware(req, res, next) {
  console.log(`${req.method} ${res.statusCode} ${req.url}`);
  next();
}

// const loggerMiddleware = (customMessage) => (req, res, next) => {
//   console.log(`${req.method} ${res.statusCode} ${req.url}`);
//   console.log(customMessage);
//   next();
// };

// app.use(express.urlencoded({ extended: false }));
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));

app.set('view engine', 'ejs');
app.set('views', './views');

// Pages

// http://localhost:5000/
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

const users = [
  {
    name: 'Tedy',
    age: 20,
    species: 'student',
  },
  {
    name: 'Adam',
    age: 32,
    species: 'worker',
  },
];

app.get('/users', (req, res) => {
  res.render('users', { users });
});

app.get('/users/:username', (req, res) => {
  const { username } = req.params;

  const user = users.find((user) => user.name === username);

  res.render('user-info', { user });
});

// ./Pages

// http://localhost:5000/anything
app.get('/:userId', (req, res) => {
  console.log(req.params);
  res.send(`Hello, ${req.params.userId}`);
});

app.post('/login', (req, res) => {
  console.log(req.body);
  res.json(`Successfully signed in as ${req.body.username}`);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
