const passport = require('passport');

// Реалізуйте мідлвер для перевірки авторизації користувача
// У випадку неавторизованого користувача вертаємо помилку 401
// В іншому випадку продовжуємо обробку запиту
module.exports = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user) {
      res.status(401).json({
        message: 'Unauthorized',
      });
      return;
    }

    req.user = user;
    next();
  })(req, res, next);
};
