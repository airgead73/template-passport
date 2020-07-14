const express = require('express');
const router = express.Router();

const checkResType = require('../middleware/checkResType');
const checkAuth = require('../middleware/checkAuth');

const user_controller = require('../controllers/client.usersController');

router
  .route('/')
  .get(
    checkResType,
    checkAuth,
    user_controller.view_many
  );

router
  .route('/:userID')
  .get(
    checkResType,
    checkAuth,
    user_controller.view_one
  );

  router
  .route('/:userID/update')
  .get(
    checkResType,
    checkAuth,
    user_controller.view_update
  );  

module.exports = router;
