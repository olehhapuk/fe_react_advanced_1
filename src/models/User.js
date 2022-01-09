const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.hashPassword = async function () {
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model('user', UserSchema);
