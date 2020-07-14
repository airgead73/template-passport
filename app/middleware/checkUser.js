const asyncHandler = require('./handleAsync');
const User = require('../models/User');
const { ISDEV } = require('../config/config');

const checkUser = asyncHandler(async (req, res, next) => {

  // Skip user check if validation failed

  if(res.locals.validation_fail) return next();

  if(ISDEV) {
    console.log('\n*****************');
    console.log('User checked.');
    console.log('*****************\n');
  }  

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  // Check if user
  if(!user) {
    console.log('wrong email');
    res.locals.authorization_fail = true;
    res.locals.error_arr = ['Invalid credentials'];
    return next();
  }

  // Check password
  const isMatch = await user.matchPassword(password);

  if(!isMatch) {
    console.log('wrong password');
    res.locals.authorization_fail = true;
    res.locals.error_arr = ['Invalid credentials'];
    return next();
  }

  res.locals.checked_user = user;

  next();

});

module.exports = checkUser;