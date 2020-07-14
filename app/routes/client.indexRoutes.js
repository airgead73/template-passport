const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const checkResType = require('../middleware/checkResType');

const index_controller = require('../controllers/client.indexController');

router
  .route('/')
  .get(
    checkResType,
    checkAuth,
    index_controller.dashboard
  );

router
  .route('/signin')
  .get(
    checkResType,
    index_controller.signin
  );

router
  .route('/about')
  .get(
    checkResType,
    checkAuth,
    index_controller.about
  );

module.exports = router;