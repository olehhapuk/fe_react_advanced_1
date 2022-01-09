const express = require('express');
const passport = require('passport');

const User = require('../models/User');

// const router = require('express').Router();
const router = express.Router();

router.post('/login', (req, res, next) => {
  // req.session.passport.user = userId
  // req.user = user data

  passport.authenticate('local', (error, user) => {
    if (!user) {
      res.status(400).json({
        message: 'Wrong credentials',
      });
      return;
    }

    if (error) {
      console.log(error);
      res.status(500).send(error);
      return;
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }

      res.json(user);
    });
  })(req, res, next);
});

router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      res.status(400).json({ message: 'Username is already taken' });
      return;
    }

    // Create local user
    const newUser = new User(req.body);
    // Hash password
    await newUser.hashPassword();
    // Save new user with hashed password to database
    await newUser.save();

    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
