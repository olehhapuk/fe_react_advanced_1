module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  // res.status(401).json({
  //   message: 'Unauthorized',
  // });
  res.redirect('/login');
};

// request -> isAuthenticated ? -> handler : -> return;
