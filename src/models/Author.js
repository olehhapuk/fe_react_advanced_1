const { model, Schema } = require('mongoose');

const Author = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'book',
    },
  ],
});

module.exports = model('author', Author);
