const asyncHandler = require('./handleAsync');
const { ISDEV } = require('../config/config');

const checkAuth = asyncHandler(async (req, res, next) => {

  if(ISDEV) {
    console.log('\n*****************');
    console.log('Auth checked.');
    console.log('*****************\n');
  }

  if(req.isAuthenticated()) {
    console.log('user: ', req.user);
    res.locals.username = (req.user).name;
    return next();
  }

  req.flash('error_msg', 'Access not authorized. Please, sign in.');
  res.redirect('/signin');

});

module.exports = checkAuth;
