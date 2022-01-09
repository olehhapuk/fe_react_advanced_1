const express = require('express');
require('dotenv').config();
const cors = require('cors');
const volleyball = require('volleyball');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const authRouter = require('./routes/auth');
const User = require('./models/User');

const app = express();

// Connect to Mongo DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

// Configure global middlewares
app.use(
  cors({
    origin: '*',
  })
);
app.use(volleyball);
app.use(helmet());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    key: 'session-key', // connect.sid
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 2592000,
      path: '/',
    },
  })
);
app.use(express.json());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({
          username,
        });
        if (!user || !(await user.validPassword(password))) {
          done(null, false);
          return;
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);

module.exports = app;
