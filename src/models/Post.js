const { Schema, model } = require('mongoose');

const Post = new Schema({
  title: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tag',
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = model('post', Post);
