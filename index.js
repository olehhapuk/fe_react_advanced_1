const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.post('/', async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        password: 'pass',
        username: 'user',
      },
    });

    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Started on http://localhost:${process.env.PORT}`);
});
