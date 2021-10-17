const { Schema, model } = require('mongoose');

const Task = new Schema({
  text: String,
  completed: Boolean,
});

module.exports = model('task', Task);
