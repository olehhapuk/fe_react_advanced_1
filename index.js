const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('user', userSchema);

app.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

mongoose.connect('mongodb://root:example@db:27017').then(() => {
  app.listen(5000, () => {
    console.log('Started on 5000');
  });
});
