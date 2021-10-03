const { Schema, model } = require('mongoose');

/*
  User {
    username: string;
    password: string;
    age: number;
    email: string;
  }
*/

const User = new Schema(
  {
    username: {
      type: String,
      unique: true,
      minlength: [3, 'Should be 3 characters or longer {VALUE}'],
    },
    password: String,
    age: {
      type: Number,
      min: 14,
    },
    email: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('user', User);
