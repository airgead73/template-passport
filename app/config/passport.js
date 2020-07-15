const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model
const User = mongoose.model('User');
//const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          console.log('user not found');
          return done(null, false, { message: 'No User Found' });
        }

        console.log(user);

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          //if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            console.log('incorrect password');
            return done(null, false, { message: 'Password Incorrect' });
          }
        });

        // const isMatch = await user.matchPassword(password);

        // if(isMatch) {
        //   return done(null, user);
        // } else {
        //   console.log('incorrect password');
        //   return done(null, false, { message: 'Password incorrect.'});
        // }


      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};