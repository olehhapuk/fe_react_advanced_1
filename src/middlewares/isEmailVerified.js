module.exports = (req, res, next) =>
  req.user.isVerified
    ? next()
    : res.status(401).send('Спочатку підтвердіть E-Mail');
