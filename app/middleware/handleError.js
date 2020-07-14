const { ISDEV, JWT_SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const handleError = async function(err, req, res, next) {

  if(ISDEV) {
    console.log('****************************');
    console.error({
      name: err.name,
      status: err.status,
      msg: err.message
    });
    console.log('****************************');
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

  } catch(err) {
    console.error(err);
  }  

  switch(err.name) {
    case 'NotFoundError':
      if(!(req.headers.accept).includes('json')) {
        return res
          .status(404)
          .render('pages/error', {
            status: 404,
            title: 'error',
            msg: 'Page not found'
          })
      }
      return res
        .status(404)
        .json({
          status: err.status,
          msg: 'Page not found'
        });
      break;
    case 'ReferenceError':
      if(!(req.headers.accept).includes('json')) {
        return res
          .status(500)
          .render('pages/error', {
            status: 404,
            title: 'error',
            msg: 'Internal Server Error (reference)'
          })
      }      
      return res
        .status(500)
        .json({
          status: err.status,
          msg: 'Internal Server Error (reference)'
        });
      break; 
    case 'CastError': 
      if(!(req.headers.accept).includes('json')) {
        return res
          .status(404)
          .render('pages/error', {
            status: 404,
            title: 'error',
            msg: 'Resource not found'
          })
      }    
      return res
        .status(404) 
        .json({
          status: 404,
          msg: 'Resource not found'
        });
        break;
    default:
      if(!(req.headers.accept).includes('json')) {
        return res
          .status(500)
          .render('pages/error', {
            status: 500,
            title: 'error',
            msg: err.message
          })
      }      
      return res
        .status(500) 
        .json({
          status: 500,
          msg: err.message
        }); 
  }

}

module.exports = handleError;