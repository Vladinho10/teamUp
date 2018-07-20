'use strict';
const path = require('path');
const express = require('express');
//const db = require('./db');
//const TODO = require('./crud');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const session = require('express-session');
const cors = require('cors');
const passport = require('./passport');
const User = require('./model_crud');
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'../frontend/dist')));

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
  passport.authenticate('facebook', { successRedirect: '/account',
                                      failureRedirect: '/' }));
app.get('/',(req,res)=>{
    console.log('in / path');
        if(!req.user){
            res.sendFile(path.join(__dirname,'../../frontend/dist/index.html'));
        }else{
            res.redirect('/account');
        }
        
    
});
/*
app.get('/',(req,res)=>{
    
    let current_user = User.findOne({fb_id:req.user.fb_id},(err,user)=>{
        res.json(user);
    });
   // console.log(current_user);
    console.log('in / user is:',req.user);
});
*/
 app.get('/account', (req,res) => {
     if(req.user){
         let profile = req.user;
         User.findUser(req.user.fb_id,res);
     }else{
         res.redirect('/');
     }
    
 });
module.exports = app;

