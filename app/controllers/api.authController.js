const asyncHandler = require('../middleware/handleAsync');
const User = require('../models/User');
const { ISDEV } = require('../config/config');

/**
 * @route   POST api/auth
 * @desc    Signin user
 * @access  public
 */

 exports.signin = asyncHandler(async function(req, res, next) {

   const { email, password } = req.body;

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

   if(res.locals.res_html) {
    return sendTokenResponse(res.locals.checked_user, 200, res);
   }

   res
    .status(res.locals.validation_fail ? 400 : 200)
    .json({
      success: res.locals.validation_fail ? false : true,
      msg: res.locals.validation_fail ? res.locals.error_arr : 'Signin user',
      user: {
        email,
        password
      }
    });
   
 });

 exports.signout = asyncHandler(async function(req, res, next) {

  const options = {
    expires: new Date(Date.now() + 10),
    httpOnly: true,
    secure: ISDEV ? false : true    
  }

  res
    .cookie('token', 'none', options)
    .status(200)
    .redirect('/signin'); 

 });

 const sendTokenResponse = (user, statusCode, res) => {

  // Create token
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now()+ process.env.JWT_COOKIE_EXP *24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: ISDEV ? false : true
  }

  return res
    .status(statusCode)
    .cookie('token', token, options)
    .redirect('/');

 }