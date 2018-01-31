const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user.model');

passport.use(new GoogleStrategy({
    clientID: "384241759152-rsqs321e96fo7nss6c2g5ssr0abhv47p.apps.googleusercontent.com",
    clientSecret: "EdWXD3_iOpvfWJ--6uyVxaKN",
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ userId: profile.id }, { name: profile.displayName, userId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

module.exports = passport;
