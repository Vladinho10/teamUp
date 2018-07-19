var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./model_crud');

const config = require('../config/config');

passport.use(new FacebookStrategy({
    clientID: config.facebook_config.app_id,
    clientSecret: config.facebook_config.app_secret,
    callbackURL: config.facebook_config.callback_url[0],
    profileFields:['displayName','picture.type(large)']
  },
  function(accessToken, refreshToken, profile, done) {
    //User
    console.log('-----------',profile);
    done(null,{
      name:profile.displayName,
      fb_id:profile.id,
      access_token:accessToken,
      refresh_token:refreshToken,
      photo:profile.photos[0].value
    });  
    
    //console.log("https://graph.facebook.com/" + profile.username + "/picture" + "?width=200&height=200" + "&access_token=" + accessToken)
    
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
