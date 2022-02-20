const { Schema, model } = require('mongoose');

const Post = new Schema({
  title: String,
  description: String,
});

module.exports = model('post', Post);
