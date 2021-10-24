const { model, Schema } = require('mongoose');

const Book = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'author',
    },
    coverImg: {
      type: String,
    },
    quantity: {
      type: Number,
      min: 0,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('book', Book);
