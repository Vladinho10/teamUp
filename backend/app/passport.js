var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config/config');
passport.use(new FacebookStrategy({
    clientID: config.facebook_config.app_id,
    clientSecret: config.facebook_config.app_secret,
    callbackURL: config.facebook_config.callback_url,
    profileFields:['photos']
  },
  function(accessToken, refreshToken, profile, done) {
    //User
    console.log('-----------',profile);
    //console.log("https://graph.facebook.com/" + profile.username + "/picture" + "?width=200&height=200" + "&access_token=" + accessToken)
    done(null,{name:profile.displayName,fb_id:profile.id});
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
