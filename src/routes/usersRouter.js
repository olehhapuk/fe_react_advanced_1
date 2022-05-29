const express = require('express');

const prisma = require('../../config/prisma');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        profile: {
          create: {
            age: req.body.age,
            displayName: req.body.displayName,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
      include: {
        profile: true,
      },
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:userId', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +req.params.userId,
      },
    });
    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: +req.params.userId,
      },
      data: {
        username: req.body.username,
        profile: {
          update: {
            age: req.body.age,
            displayName: req.body.displayName,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    const result = await prisma.user.delete({
      where: {
        id: +req.params.userId,
      },
    });

    console.log(result);
    res.json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
