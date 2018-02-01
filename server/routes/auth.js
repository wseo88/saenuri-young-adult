const express = require('express');
const validator = require('validator');
const passport = require('passport');
const passportGoogle = require('../auth/google');
const User = require('../models/user');

const router = new express.Router();

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateRegisterForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
    }

    // if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    //     isFormValid = false;
    //     errors.name = 'Please provide your name.';
    // }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

router.post('/register', (req, res, next) => {
    const validationResult = validateRegisterForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }  

    passport.authenticate('local', (err) => {

      // TODO: Figure this out!
      // if (err) {
      //   if (err.name === 'MongoError' && err.code === 11000) {
      //     // the 11000 Mongo code is for a duplication email error
      //     // the 409 HTTP status code is for conflict error
      //     return res.status(409).json({
      //       success: false,
      //       message: 'Check the form for errors.',
      //       errors: {
      //         email: 'This email is already taken.'
      //       }
      //     });
      //   }
  
      //   return res.status(400).json({
      //     success: false,
      //     message: 'Could not process the form.'
      //   });
      // }
  
      // return res.status(200).json({
      //   success: true,
      //   message: 'You have successfully registered! Now you should be able to log in.'
      // });
    })(req, res, next);
});

router.post('/login', (req, res, next) => {
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }
  
  
    return passport.authenticate('local-login', (err, token, userData) => {
      if (err) {
        if (err.name === 'IncorrectCredentialsError') {
          return res.status(400).json({
            success: false,
            message: err.message
          });
        }
  
        return res.status(400).json({
          success: false,
          message: 'Could not process the form.'
        });
      }
  
  
      return res.json({
        success: true,
        message: 'You have successfully logged in!',
        token,
        user: userData
      });
    })(req, res, next);
});  

/* LOGIN ROUTER */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Please Sign In with:' });
});

  /* LOGOUT ROUTER */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

/* GOOGLE ROUTER */
router.get('/google', passportGoogle.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
      res.redirect('/');
  }
);

module.exports = router;
