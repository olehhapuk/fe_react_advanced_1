const express = require('express');
const volleyball = require('volleyball');
const path = require('path');
require('dotenv').config();
// import dotenv from 'dotenv';
// dotenv.config();

const articles = require('./routes/articles');

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(volleyball);
app.use(express.static(path.join(__dirname + '../public')));

// GET /articles
// GET /articles/:id
// POST /articles
app.use('/articles', articles);

module.exports = app;
