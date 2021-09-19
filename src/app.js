const express = require('express');
const volleyball = require('volleyball');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
require('dotenv').config();
// import dotenv from 'dotenv';
// dotenv.config();

const articles = require('./routes/articles');

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(volleyball);
app.use(express.static(path.join(__dirname + '../public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
  })
);

// GET /articles
// GET /articles/:id
// POST /articles
app.use('/articles', articles);

app.get('/cookie', (req, res) => {
  console.log(req.cookies.message);
  console.log(req.signedCookies.secret);
  res.render('cookie');
});

app.get('/set-cookie', (req, res) => {
  res.cookie('message', 'Hello, World!');
  res.cookie('secret', 'hi', { signed: true });
  res.redirect('/cookie');
});

app.get('/clear-cookie', (req, res) => {
  res.clearCookie('message');
  res.clearCookie('secret');
  res.redirect('/cookie');
});

app.get('/views', (req, res) => {
  req.session.views = req.session.views ? req.session.views + 1 : 1;
  res.render('views', { views: req.session.views });
});

module.exports = app;
