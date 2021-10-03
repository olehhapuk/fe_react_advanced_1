const { Schema, model } = require('mongoose');

const Post = new Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  text: {
    type: String,
    minlength: 10,
  },
});

module.exports = model('post', Post);
