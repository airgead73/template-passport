const jwt = require('jsonwebtoken');
const asyncHandler = require('./handleAsync');
const User = require('../models/User');
const { ISDEV, JWT_SECRET } = require('../config/config');

const checkAuth = asyncHandler(async (req, res, next) => {

  if(ISDEV) {
    console.log('\n*****************');
    console.log('Auth checked.');
    console.log('*****************\n');
  }

  let token;

  token = req.cookies.token;

  if(!token) {
    return res
      .status(401)
      .redirect('/signin');
  }

  try {

    // Verify token
    const decoded = await jwt.verify(token, JWT_SECRET);
  
    req.user = await User.findById(decoded.id);
    res.locals.user = req.user;
    res.locals.username = (req.user).name;
    res.locals.userid = (req.user).id;

    next();

  } catch(err) {
    console.error(err);
  }

});

module.exports = checkAuth;
