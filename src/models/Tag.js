const { Schema, model } = require('mongoose');

const Tag = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = model('tag', Tag);
