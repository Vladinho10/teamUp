'use strict';
const path = require('path');
const express = require('express');
const multer = require('multer');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const session = require('express-session');
const cors = require('cors');
const passport = require('./passport');

const {User,Event} = require('./model_crud');

const Storage = multer.diskStorage({
    destination:function(req,file,cb){
        console.log(file);
        cb(null,'../frontend/dist/images/users_images');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() +'.jpg'); 
    }
});

const upload = multer({storage:Storage});

app.use(express.static(path.join(__dirname,'../../frontend/dist')));

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
  passport.authenticate('facebook', { successRedirect: '/dashboard',
                                      failureRedirect: '/' }));
app.get('/',(req,res)=>{
    console.log('in / path');
        if(!req.user){
            res.sendFile(path.join(__dirname,'../../frontend/dist/index.html'));
            return;
        }
        res.redirect('/dashboard');
        
    
});

app.get('/*', (req,res) => {
    if(req.user){
        res.sendFile(path.join(__dirname,'../../frontend/dist/index.html'));
    }else{
        res.redirect('/');
}
});
 
app.post('/api/dashboard',(req,res)=>{
    console.log(req.body);
    console.log('under api/dashboard');
    if(req.user){
        console.log('under req.user');
        let data = {};
        Event.find({}).then((events)=>{
            data.events = events;
            console.log('under event callback');
            User.findOne({fb_id:req.user.id}).then((user)=>{
                data.user = user;
                console.log(data);
                res.json(data);
            });
        });
    }
 });


 app.post('/api/upload_user_image',upload.single('avatar'),(req,res)=>{
    if(req.user){
        console.log(req.user.id);
        
        User.updateOne({fb_id:req.user.id},{$set:{photo:'dist/images/users_images/avatar-'  + req.user.id}}).then((err,data)=>{
            console.log('saved');
        });
    }
 });
module.exports = app;
