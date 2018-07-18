'use strict';
const path = require('path');
const express = require('express');
//const db = require('./db');
//const TODO = require('./crud');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const passport = require('./passport');
// app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.get('/auth/facebook', passport.authenticate('facebook',{ scope: ['email', 'user_gender'] }),(req,res)=>{
    console.log(req.user);
});
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
app.get('/login',(req,res)=>{
    console.log('in / path');
    
        res.sendFile(path.join(__dirname,'../public/index.html'));
    
});
app.get('/',(req,res)=>{
    res.json('Success');
});
module.exports = app;

