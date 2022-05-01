const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');

const User = require('../models/User');
const mailTransport = require('../config/mailTransport');

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const verificationToken = nanoid();

    const newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
      verificationToken,
    });

    const jwtToken = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    await mailTransport.sendMail({
      to: newUser.email,
      from: process.env.MAIL_USER,
      subject: 'Підтвердіть свій E-Mail',
      html: `
        <h1>Перейдіть за посиланням щоб підтвердити E-Mail</h1>
        <p>Або скопіюйте посилання нижче і перейдіть самостійно</p>
        <p>${verificationToken}</p>
      `,
      text: `Підтвердити E-Mail: ${verificationToken}`,
    });

    res.json({
      user: newUser,
      authToken: jwtToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.verify = async (req, res) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOneAndUpdate(
      { verificationToken },
      {
        verificationToken: null,
        isVerified: true,
      },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const verificationToken = nanoid();

    const user = await User.findOneAndUpdate(
      { email },
      {
        verificationToken,
        isVerified: false,
      },
      { new: true }
    );

    await mailTransport.sendMail({
      to: user.email,
      from: process.env.MAIL_USER,
      subject: 'Підтвердіть свій E-Mail',
      html: `
        <h1>Перейдіть за посиланням щоб підтвердити E-Mail</h1>
        <p>Або скопіюйте посилання нижче і перейдіть самостійно</p>
        <p>${verificationToken}</p>
      `,
      text: `Підтвердити E-Mail: ${verificationToken}`,
    });

    res.send('Підтвердження надіслано');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
