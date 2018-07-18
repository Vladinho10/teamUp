const passport = require('passport');


const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config/config');

passport.use(new FacebookStrategy({
  clientID: config.facebook_config.app_id,
  clientSecret: config.facebook_config.app_secret,
  callbackURL: config.facebook_config.callback_url
},
  ((accessToken, refreshToken, profile, done) => {
    User.findOrCreate((err, user) => {
      if (err) { return done(err); }
      done(null, user);
    });
  })));
