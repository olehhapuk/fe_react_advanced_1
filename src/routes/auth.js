const express = require('express');
const passport = require('passport');

const User = require('../models/User');
const isAuthenticated = require('../middlewares/isAuthenticated');

// const router = require('express').Router();
const router = express.Router();

function loginUser(req, res, next) {
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
}

router.post('/login', loginUser);

router.post('/register', async (req, res, next) => {
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

    loginUser(req, res, next);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/profile', isAuthenticated, (req, res) => {
  res.json(req.user);
});

router.post('/logout', isAuthenticated, (req, res) => {
  req.logout();
  res.json({
    message: 'Logged out',
  });
});

module.exports = router;
