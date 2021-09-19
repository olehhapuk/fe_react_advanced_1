const express = require('express');
const volleyball = require('volleyball');
const path = require('path');
require('dotenv').config();

const users = require('./routes/users');

const app = express();

app.use(volleyball);
app.use(express.static(path.join(__dirname + '../public')));
app.use(express.json());

app.use('/api/users', users);

module.exports = app;
