const asyncHandler = require('../middleware/handleAsync');
const User = require('../models/User');

/**
 * @route   GET /users
 * @desc    View users page
 * @access  private
 */
exports.view_many = asyncHandler(async function(req, res, next) {
  const users = await User.find().sort({ createdAt: -1 });
  
  res
    .status(200)
    .render('pages/users/index',{
      success: true,
      msg: 'View users page',
      title: 'users',
      form_user_add: true,
      users
  });
 
});

/**
 * @route   GET /users/:userID
 * @desc    View user detail
 * @access  private
 */
exports.view_one = asyncHandler(async function(req, res, next) {
  const user = await User.findById(req.params.userID);
  res.status(200).render('pages/users/detail',{
    success: true,
    msg: 'View user detail',
    title: `${user.name}`,
    user
  });
 
});

/**
 * @route   GET /users/:userID/update
 * @desc    View update user form
 * @access  private
 */
exports.view_update = asyncHandler(async function(req, res, next) {
  const user = await User.findById(req.params.userID);
  res.status(200).render('pages/users/update',{
    success: true,
    msg: 'View user detail',
    title: `${user.name}`,
    form_user_update: true,
    user
  });
 
});