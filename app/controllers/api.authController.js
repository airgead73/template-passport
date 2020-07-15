const asyncHandler = require('../middleware/handleAsync');
const User = require('../models/User');
const { ISDEV } = require('../config/config');
const passport = require('passport');

/**
 * @route   POST api/auth
 * @desc    Signin user
 * @access  public
 */

 exports.signin = asyncHandler(async function(req, res, next) {

   if(
     res.locals.validation_fail ||
     res.locals.authorization_fail &&
     res.locals.res_html
     ) {
    req.flash('error_msg', (res.locals.error_arr).join(' '));
    return res
     .status(400)
     .redirect('/signin');
   }

   passport.authenticate('local', {
     successRedirect: '/',
     failureRedirect: '/signin',
     failureFlash: true
   })(req, res, next);
   
 });

 exports.signout = asyncHandler(async function(req, res, next) {

  req.logout();
  res
    .status(200)
    .redirect('/signin');   

 });

