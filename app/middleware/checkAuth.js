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

});

module.exports = checkAuth;
