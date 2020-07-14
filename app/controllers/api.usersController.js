const asyncHandler = require('../middleware/handleAsync');
const User = require('../models/User');

/**
 * @route   POST /api/users
 * @desc    Create a user
 * @access  private
 */
exports.create = asyncHandler(async function(req, res, next) {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password
  });

  await user.save();

  // Create token
  const token = user.getSignedJwtToken();

  if(res.locals.res_html) {
    return res
      .status(200)
      .redirect('/users');
  }
  
  res
    .status(200)
    .json({
      success: true,
      user: {
        name: user.name,
        email: user.email
      },
      token
    });

});

/**
 * @route   GET /api/users
 * @desc    Read users
 * @access  private
 */
exports.read_many = asyncHandler(async function(req, res, next) {

  const users = await User.find().sort({ createdAt: -1});
  
  res
    .status(200)
    .json({
      success: true,
      msg: 'Read users',
      users
    });

});

/**
 * @route   GET /api/users/:userID
 * @desc    Read single user
 * @access  private
 */
exports.read_single = asyncHandler(async function(req, res, next) {

  const user = await User.findById(req.params.userID);
  
  res
    .status(200)
    .json({
      success: true,
      msg: 'Read single user',
      user
    });

});

/**
 * @route   GET /api/users/current
 * @desc    Read current user
 * @access  private
 */
exports.read_current = asyncHandler(async function(req, res, next) {
  
  res
    .status(200)
    .json({
      success: true,
      msg: 'Read current user'
    });

});

/**
 * @route   PUT /api/users/:userID
 * @desc    Update user
 * @access  private
 */
exports.update = asyncHandler(async function(req, res, next) {

  const { name, email } = req.body;

  // Build fields
  const contactFields = {};
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;

  console.log(contactFields);

  // Find user
  let user = await User.findById(req.params.userID);

  if(!user) {
    return res
      .status(404)
      .json({
        success: false,
        errors: [
          {
            msg: '2: User not found'
          }
        ]
    });   
  }

  // Update user
  user = await User.findByIdAndUpdate(req.params.userID, { $set: contactFields }, { new: true });

  if(res.locals.res_html) {
    return res
      .status(200)
      .redirect(`/users/${req.params.userID}`);
  }

  res
    .status(200)
    .json({
      success: true,
      msg: `${user.name} updated.`
  }); 

});

/**
 * @route   DELETE /api/users/:userID
 * @desc    Update user
 * @access  private
 */
exports.delete = asyncHandler(async function(req, res, next) {

  let user = await User.findById(req.params.userID);

  // If user not found
  if(!user) {
    return res.status(404).json({
      success: false,
      errors: [
        {
          msg: '3: User not found'
        }
      ]
    });   
  }

  // Delete user
  user = await User.findByIdAndRemove(req.params.userID);

  if(res.locals.res_html) {
    return res
      .status(200)
      .redirect('/users');
  }

  res
    .status(200)
    .json({
      success: true,
      msg: `${user.name} is deleted.`
  }); 

});