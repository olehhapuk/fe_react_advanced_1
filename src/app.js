const express = require('express');
const volleyball = require('volleyball');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(volleyball);
app.use(express.static(path.join(__dirname + '../public')));

module.exports = app;
