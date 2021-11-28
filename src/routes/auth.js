const express = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { auth } = require('../middlewares');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ message: 'This email is already in use.' });
      return;
    }

    const newUser = await User.create(req.body);

    const payload = {
      _id: newUser._id,
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      user: newUser,
      token: jwtToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.validPassword(req.body.password))) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const payload = {
      _id: user._id,
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      user: user,
      token: jwtToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/me', auth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
