'use strict';
const path = require('path');
const express = require('express');
//const db = require('./db');
//const TODO = require('./crud');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const session = require('express-session');
const cors = require('cors');
const passport = require('./passport');
// app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());
app.use(session({secret: '123'}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(cors());

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
app.get('/login',(req,res)=>{
    console.log('in / path');
    
        res.sendFile(path.join(__dirname,'../public/index.html'));
    
});
app.get('/',(req,res)=>{
    res.json('Success');
    console.log('in / user is:',req.user);
});
module.exports = app;

