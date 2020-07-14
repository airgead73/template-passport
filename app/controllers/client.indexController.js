const asyncHandler = require('../middleware/handleAsync');

/**
 * @route   GET /
 * @desc    view dashboard
 * @access  private
 */
exports.dashboard = asyncHandler(async function(req, res, next) {
  return res
    .status(200)
    .render('pages/index', {
      success: true,
      title: 'dashboard'
    });

});

/**
 * @route   GET /signin
 * @desc    view signin
 * @access  public
 */
exports.signin = asyncHandler(async function(req, res, next) {
  return res
    .status(200)
    .render('pages/signin', {
      success: true,
      title: 'signin',
      form_user_signin: true
    });

});

/**
 * @route   GET /about
 * @desc    view about
 * @access  private
 */
exports.about = asyncHandler(async function(req, res, next) {
  return res
    .status(200)
    .render('pages/about', {
      success: true,
      title: 'about'
    });

});