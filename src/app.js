const express = require('express');
const volleyball = require('volleyball');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const path = require('path');

const { auth, upload } = require('./routes');
const { User } = require('./models');

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(volleyball);
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, '../public')));

// Напишіть стратегію jwt авторизації
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id);
        if (!user) {
          done(new Error('User not found'));
          return;
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

app.get('/', (req, res, next) => {
  res.json({ message: 'Hello, World!' });
});

// app.get('/avatars/:avatarName', async (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/images', req.params.avatarName));
// });

app.use('/api/auth', auth);
app.use('/api/upload', upload);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    // console.log(error.stack);
  }
  res.status(500).send(error.message);
});

module.exports = app;
