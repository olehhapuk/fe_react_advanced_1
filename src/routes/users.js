const express = require('express');
const yup = require('yup');

const schemaValidate = require('../middlewares/schemaValidate');
const { User, Post } = require('../schemas');
// import { User, Post } from '../schemas/index.js';

const router = express.Router();

/*
  User {
    username: string;
    password: string;
    age: number;
    email: string;
  }
*/

const createUserSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username should be at least 3 characters long')
    .max(255)
    .required(),
  password: yup.string().min(6).required(),
  age: yup.number().min(14).required(),
  email: yup.string().email().required(),
});

const updateUserSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username should be at least 3 characters long')
    .max(255),
  password: yup.string().min(6),
  age: yup.number().min(14),
  email: yup.string().email(),
});

/*
  baseURL = /api/users

  Create new user: POST /
  Find all users: GET /
  Find one user by id: GET /:userId
  Update user data: PUT /:userId
  Delete user by id: DELETE /:userId
*/

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    // const newUser = new User(req.body);
    // await newUser.save();

    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// /api/users/:userId
router.get('/:userId', async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.userId);
    if (!targetUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(targetUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put('/:userId', async (req, res) => {
  try {
    // User.findOneAndUpdate({ username: 'dev' }, req.body)
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: `User with id ${req.params.userId} deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
