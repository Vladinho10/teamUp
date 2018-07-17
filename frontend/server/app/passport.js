var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config/config');
passport.use(new FacebookStrategy({
    clientID: config.facebook_config.app_id,
    clientSecret: config.facebook_config.app_secret,
    callbackURL: config.facebook_config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));