const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');

const { User } = require('../models');
const { auth } = require('../middlewares');

const router = express.Router();

const imagesDir = path.join(__dirname, '../../public/avatars');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const newFilename = `${new Date().getTime()}_${file.originalname}`;
    cb(null, newFilename);
  },
});

const acceptedTypes = ['image/png', 'image/jpeg'];
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1048576 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (acceptedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Filetype is not supported'));
    }
  },
});

router.post('/register', async (req, res) => {
  try {
    // 1. Створіть нового користувача з унікальним username та зашифрованим паролем
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      res.status(400).json({
        message: 'Username is taken',
      });
      return;
    }

    const newUser = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 12),
    });

    // 2. Підготуйте payload для генерації jwt токена
    const payload = {
      id: newUser._id,
    };

    // 3. Згенеруйте jwt токен
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '14d',
    });

    res.json({
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.patch('/:userId/avatar', upload.single('avatar'), async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        avatarUrl: req.file.filename,
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    // 1. Виконайте валідацію полей username, password
    // Перевіряємо юзернейм
    const existingUser = await User.findOne({ username: req.body.username });
    if (!existingUser) {
      res.status(400).json({
        message: 'Wrong data',
      });
      return;
    }

    // Перевіряємо пароль
    const validPassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!validPassword) {
      res.status(400).json({
        message: 'Wrong data',
      });
      return;
    }

    // 2. Підготуйте payload та згенеруйте jwt токен
    const payload = {
      id: existingUser._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '14d',
    });

    res.json({
      user: existingUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/me', auth, (req, res) => {
  // 1. Забороніть використання роута для неавторизованих користувачів
  // 2. У відповідь передайте дані авторизованого користувача
  res.json(req.user);
});

module.exports = router;
