var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config/config');
passport.use(new FacebookStrategy({
    clientID: config.facebook_config.app_id,
    clientSecret: config.facebook_config.app_secret,
    callbackURL: config.facebook_config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    //User
    console.log(profile);
    done(null,{name:profile.name});
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
